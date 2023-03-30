const updateChannel = require('../functions/prismaScripts/updateBChannel');
const { checkPerm, noPerm } = require('../utils/checkPerm');

module.exports = async function moveChannel(interaction) {
  const newChannelId = interaction.options.getChannel('채널').id;
  const bName = interaction.options.getString('사업체이름');

  if (!(await checkPerm('ceo', interaction.user.id, bName)))
    return noPerm(interaction);

  const updateRes = await updateChannel(bName, newChannelId);
  if (updateRes)
    return interaction.reply(
      `사업체 채널 변경에 성공했습니다!\n사업체 이름 : \`${updateRes.name}\`\n사업체 채널 : <#${updateRes.channelId}>`
    );
  else
    return interaction.reply({
      content: `사업체 채널 변경에 실패했습니다.`,
      ephemeral: true,
    });
};
