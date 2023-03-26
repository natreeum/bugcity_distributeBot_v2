const getB = require('../functions/prismaScripts/getBusiness');
const getMs = require('../functions/prismaScripts/getMems');

module.exports = async function checkMembers(interaction) {
  const bName = interaction.options.getString('사업체이름');
  const business = await getB(bName);
  const mems = await getMs(bName);
  const ceos = mems.filter((e) => e.level === 'c');
  const executives = mems.filter((e) => e.level === 'e');
  const staffs = mems.filter((e) => e.level === 's');
  let message = `\`${bName}\`의 직원 명단입니다.\n`;
  if (ceos.length != 0) {
    message += `사장\n`;
    for (const i of ceos) {
      message += `<@${i.discordId}>\n`;
    }
  }
  if (executives.length != 0) {
    message += `임원\n`;
    for (const i of executives) {
      message += `<@${i.discordId}>\n`;
    }
  }
  if (staffs.length != 0) {
    message += `직원\n`;
    for (const i of staffs) {
      message += `<@${i.discordId}>\n`;
    }
  }
  await interaction.reply(message);
};
