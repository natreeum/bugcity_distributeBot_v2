const delB = require('../functions/prismaScripts/delBusiness');
const getB = require('../functions/prismaScripts/getBusiness');
const { checkPerm, noPerm } = require('../utils/checkPerm');

module.exports = async function remove(interaction) {
  const bName = interaction.options.getString('사업체이름');
  if (!(await checkPerm('ceo', interaction.user.id, bName)))
    return noPerm(interaction);
  const bsns = await getB(bName);
  if (!bsns)
    return interaction.reply({
      content: `해당 사업체가 존재하지 않습니다. 사업체 이름을 확인해주세요.`,
      ephemeral: true,
    });
  if (bsns.activated)
    return interaction.reply({
      content: `해당 사업체가 활성화 상태입니다.\n\`/근벅단 비활성화\`명령어를 통해 사업체 비활성화 후 재시도하세요.`,
      ephemeral: true,
    });

  const delRes = await delB(bName);
  await interaction.reply(`\`${delRes.name}\` 사업체가 삭제되었습니다!`);
};
