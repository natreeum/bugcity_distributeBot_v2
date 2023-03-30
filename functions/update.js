const updateB = require('../functions/prismaScripts/updateBusiness');
const { checkPerm, noPerm } = require('../utils/checkPerm');

module.exports = async function update(interaction) {
  const oldBName = interaction.options.getString('사업체이름');
  if (!(await checkPerm('ceo', interaction.user.id, oldBName)))
    return noPerm(interaction);
  const newBName = interaction.options.getString('새사업체이름');
  const updateRes = await updateB(oldBName, newBName);
  if (updateRes)
    await interaction.reply(
      `사업체 이름이 변경되었습니다!\n기존 사업체 이름 : \`${oldBName}\`\n새 사업체 이름 : \`${updateRes.name}\``
    );
  else await interaction.reply(`사업체 이름 변경에 실패했습니다!`);
};
