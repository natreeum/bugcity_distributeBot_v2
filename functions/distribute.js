const getBs = require('../functions/prismaScripts/getAllBs');
const getMems = require('./prismaScripts/getMems');
const wageType = require('../utils/wageType');
const { memberCntDividence } = require('../utils/wageVal');
const { checkPerm, noPerm } = require('../utils/checkPerm');
const paidWageCheck = require('../utils/paidWageCheck');

async function dist(type, mems, paidRes) {
  let cMessage = '**사장**\n';
  let eMessage = '**임원**\n';
  let sMessage = '**알바**\n';
  let vMessage = '**휴무**\n';
  for (const m of mems) {
    if (m.level !== 'v') {
      if (m.level === 'c') {
        const wage = paidWageCheck(paidRes, m.discordId, type[m.level] * 7);
        cMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        // wage 만큼 m.discordId 에게 입금
      }
      if (m.level === 'e') {
        const wage = paidWageCheck(paidRes, m.discordId, type[m.level] * 7);
        eMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        // wage 만큼 m.discordId 에게 입금
      }
      if (m.level === 's') {
        const wage = paidWageCheck(paidRes, m.discordId, type[m.level] * 7);
        sMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        // wage 만큼 m.discordId 에게 입금
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
  // Check Permission
  if (!(await checkPerm('admin', interaction.user.id)))
    return noPerm(interaction);

  const businesses = await getBs();
  const activated = businesses.filter((e) => e.activated);
  const paidRes = {};
  await interaction.reply(`사업체 급여 분배를 시작합니다.`);
  for (const b of activated) {
    const mems = await getMems(b.name);
    const c = mems.filter((e) => e.level === 'c');
    const e = mems.filter((e) => e.level === 'e');
    const s = mems.filter((e) => e.level === 's');
    const v = mems.filter((e) => e.level === 'v');
    if (e.length + s.length >= memberCntDividence) {
      await interaction.followUp(
        `사업체 이름 : **${b.name}**\n사업체 채널 : <#${
          b.channelId
        }>\n\n${await dist(wageType.type3, mems, paidRes)}`
      );
    } else if (
      e.length + s.length < memberCntDividence &&
      e.length + s.length != 0
    ) {
      await interaction.followUp(
        `사업체 이름 : **${b.name}**\n사업체 채널 : <#${
          b.channelId
        }>\n\n${await dist(wageType.type2, mems, paidRes)}`
      );
    } else {
      await interaction.followUp(
        `사업체 이름 : **${b.name}**\n사업체 채널 : <#${
          b.channelId
        }>\n\n${await dist(wageType.type1, mems, paidRes)}`
      );
    }
  }
};
