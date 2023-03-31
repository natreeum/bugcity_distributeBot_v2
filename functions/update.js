const updateB = require('../functions/prismaScripts/updateBusiness');
const { checkPerm, noPerm, noB } = require('../utils/checkPerm');

module.exports = async function update(interaction) {
  const oldBName = interaction.options.getString('사업체이름');

  // Permission Check
  const checkPermRes = await checkPerm('ceo', interaction.user.id, oldBName);
  if (!checkPermRes) return noPerm(interaction);
  if (checkPermRes === 2) return noB(interaction);

  const newBName = interaction.options.getString('새사업체이름');
  const updateRes = await updateB(oldBName, newBName);
  if (updateRes)
    await interaction.reply(
      `사업체 이름이 변경되었습니다!\n기존 사업체 이름 : \`${oldBName}\`\n새 사업체 이름 : \`${updateRes.name}\``
    );
  else await interaction.reply(`사업체 이름 변경에 실패했습니다!`);
};
