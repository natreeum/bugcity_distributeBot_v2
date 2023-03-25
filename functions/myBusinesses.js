const myBs = require('../functions/prismaScripts/checkMyBs');
module.exports = async function myBusinesses(interaction) {
  const userId = interaction.user.id;
  const myBusinesses = await myBs(userId);
  const filteredB = myBusinesses.filter((e) => e.level === 'c');
  const filteredMessage = filteredB.reduce(
    (list, b) => list + `\`` + b.businessName + `\`` + `\n`,
    `<@${userId}>님이 사장님이신 사업체 목록은 다음과 같습니다.\n`,
    myBusinesses
  );
  return interaction.reply(filteredMessage);
};
