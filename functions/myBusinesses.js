const myBs = require('../functions/prismaScripts/checkMyBs');
const getBusiness = require('./prismaScripts/getBusiness');
module.exports = async function myBusinesses(interaction) {
  const userId = interaction.user.id;
  const myBusinesses = await myBs(userId);
  const filteredB = myBusinesses.filter((e) => e.level === 'c');
  const active = [];
  const deactive = [];
  for (const b of filteredB) {
    const bsns = await getBusiness(b.businessName);
    if (bsns.activated) active.push(b.businessName);
    else deactive.push(b.businessName);
  }

  let message = `<@${interaction.user.id}>사장님의 사업체 목록입니다.\n\n`;
  if (active.length !== 0)
    for (const b of active) {
      message += `\`${b}\`\n`;
    }

  if (deactive.length !== 0) {
    message += `\n 비활성화된 사업체 목록\n`;
    for (const b of deactive) {
      message += `\`${b}\`\n`;
    }
  }
  if (active.length === 0 && deactive.length === 0)
    message = `운영하고 있는 사업체가 없습니다!`;

  return interaction.reply(message);
};
