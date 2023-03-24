const createB = require('../functions/prismaScripts/createBusiness');
const getB = require('../functions/prismaScripts/getBusiness');

module.exports = async function register(interaction) {
  const bsnsName = interaction.options.getString('사업체이름');
  const ceoId = interaction.options.getUser('사장님').id;
  const bsns = await getB(bsnsName);
  if (bsns)
    return await interaction.reply({
      content: `이미 존재하는 사업체 이름입니다!`,
      ephemeral: true,
    });

  const newB = await createB(bsnsName, ceoId);
  if (newB)
    await interaction.reply(
      `<@${ceoId}> 사장님, 사업체 등록이 완료되었습니다!\n사업체 이름 : \`${newB.newB.name}\``
    );
  else await interaction.reply(`사업체 생성에 실패했습니다!`);
};
