const getBs = require('../functions/prismaScripts/getAllBs');
const getMems = require('./prismaScripts/getMems');
const wageType = require('../utils/wageType');

async function dist(type, mems) {
  let cMessage = '**사장**\n';
  let eMessage = '**임원**\n';
  let sMessage = '**알바**\n';
  let vMessage = '**휴무**\n';
  for (const m of mems) {
    if (m.level !== 'v') {
      if (m.level === 'c') {
        cMessage += `${type[m.level] * 7} **BTC** : <@${m.discordId}>\n`;
        // type[m.level] * 7 만큼 m.discordId 에게 입금
      }
      if (m.level === 'e') {
        eMessage += `${type[m.level] * 7} **BTC** : <@${m.discordId}>\n`;
        // type[m.level] * 7 만큼 m.discordId 에게 입금
      }
      if (m.level === 's') {
        sMessage += `${type[m.level] * 7} **BTC** : <@${m.discordId}>\n`;
        // type[m.level] * 7 만큼 m.discordId 에게 입금
      }
    } else {
      vMessage += `<@${m.discordId}>\n`;
    }
  }
  let message = '';
  if (cMessage.length > 8) {
    message += cMessage;
  }
  if (eMessage.length > 8) {
    message += eMessage;
  }
  if (sMessage.length > 8) {
    message += sMessage;
  }
  if (vMessage.length > 8) {
    message += vMessage;
  }
  return message;
}

module.exports = async function distribute(interaction) {
  const businesses = await getBs();
  const activated = businesses.filter((e) => e.activated);
  let distRes = '';
  for (const b of activated) {
    distRes += `사업체 : \`${b.name}\`\n`;
    const mems = await getMems(b.name);
    const c = mems.filter((e) => e.level === 'c');
    const e = mems.filter((e) => e.level === 'e');
    const s = mems.filter((e) => e.level === 's');
    const v = mems.filter((e) => e.level === 'v');
    if (e.length + s.length >= 4) {
      distRes += await dist(wageType.type3, mems);
    } else if (e.length + s.length < 4 && e.length + s.length != 0) {
      distRes += await dist(wageType.type2, mems);
    } else {
      distRes += await dist(wageType.type1, mems);
    }
    distRes += `\n`;
  }

  return interaction.reply(distRes);
};
