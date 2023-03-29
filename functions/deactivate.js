const activateB = require('../functions/prismaScripts/activateB');

module.exports = async function deactivate(interaction) {
  const bName = interaction.options.getString('사업체이름');
  const activateRes = await activateB(bName, 'deactivate');
  if (activateRes)
    return await interaction.reply(`\`${bName}\`사업체가 비활성화되었습니다.`);
  else return await interaction.reply(`사업체 비활성화에 실패했습니다.`);
};
