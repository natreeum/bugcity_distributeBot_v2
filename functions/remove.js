const delB = require('../functions/prismaScripts/delBusiness');

module.exports = async function remove(interaction) {
  const bName = interaction.options.getString('사업체이름');
  const delRes = await delB(bName);
  await interaction.reply(`\`${delRes.name}\` 사업체가 삭제되었습니다!`);
};
