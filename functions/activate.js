const activateB = require('../functions/prismaScripts/activateB');
const { checkPerm, noPerm } = require('../utils/checkPerm');

module.exports = async function activate(interaction) {
  // Permission check
  if (!(await checkPerm('admin', interaction.user.id)))
    return noPerm(interaction);
  const bName = interaction.options.getString('사업체이름');
  const activateRes = await activateB(bName, 'activate');
  if (activateRes)
    return await interaction.reply(`\`${bName}\`사업체가 활성화되었습니다.`);
  else return await interaction.reply(`사업체 활성화에 실패했습니다.`);
};
