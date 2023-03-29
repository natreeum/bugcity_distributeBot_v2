const getB = require('../functions/prismaScripts/getBusiness');
const getMs = require('../functions/prismaScripts/getMems');
const wageTypes = require('../utils/wageType');

module.exports = async function checkMembers(interaction) {
  const bName = interaction.options.getString('사업체이름');
  const business = await getB(bName);
  const mems = await getMs(bName);
  const ceos = mems.filter((e) => e.level === 'c');
  const executives = mems.filter((e) => e.level === 'e');
  const staffs = mems.filter((e) => e.level === 's');
  let wageType;
  const staffsCount = executives.length + staffs.length;
  if (staffsCount >= 4) wageType = 'type3';
  else if (staffsCount < 4 && staffsCount > 0) wageType = 'type2';
  else wageType = 'type1';

  let message = `\`${bName}\`의 직원 명단입니다.\n`;
  if (!business.activated)
    message += `\n**비활성화된 사업체입니다.\n만약 운영중인 사업체인 경우 관리자에게 문의하세요.**\n`;
  if (ceos.length != 0) {
    message += `\n사장 : ${wageTypes[wageType].c * 7} **BTC**\n`;
    for (const i of ceos) {
      message += `<@${i.discordId}>\n`;
    }
  }
  if (executives.length != 0) {
    message += `\n임원 : ${wageTypes[wageType].e * 7} **BTC**\n`;
    for (const i of executives) {
      message += `<@${i.discordId}>\n`;
    }
  }
  if (staffs.length != 0) {
    message += `\n직원 : ${wageTypes[wageType].s * 7} **BTC**\n`;
    for (const i of staffs) {
      message += `<@${i.discordId}>\n`;
    }
  }
  await interaction.reply(message);
};
