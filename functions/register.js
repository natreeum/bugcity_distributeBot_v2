const createB = require('../functions/prismaScripts/createBusiness');
const getB = require('../functions/prismaScripts/getBusiness');
const { checkPerm, noPerm } = require('../utils/checkPerm');

module.exports = async function register(interaction) {
  if (!(await checkPerm('gbd', interaction.user.id)))
    return noPerm(interaction);

  const bsnsName = interaction.options.getString('사업체이름');
  const ceoId = interaction.options.getUser('사장님').id;
  const channelId = interaction.options.getChannel('채널').id;
  const bsns = await getB(bsnsName);
  if (bsns)
    return await interaction.reply({
      content: `이미 존재하는 사업체 이름입니다!`,
      ephemeral: true,
    });

  const newB = await createB(bsnsName, ceoId, channelId);
  if (newB)
    await interaction.reply(
      `<@${ceoId}> 사장님, 사업체 등록이 완료되었습니다!\n사업체 이름 : \`${newB.newB.name}\`\n사업체 채널 : <#${newB.newB.channelId}>\n\n\`/근벅단 직원 ${newB.newB.name}\``
    );
  else await interaction.reply(`사업체 생성에 실패했습니다!`);
};
