const checkMem = require('../functions/prismaScripts/checkMemWithB');
const regMem = require('../functions/prismaScripts/regMem');
const delMem = require('../functions/prismaScripts/delMem');
const updMem = require('../functions/prismaScripts/updateMem');
const { checkPerm, noPerm, noB } = require('../utils/checkPerm');

module.exports = async function member(interaction) {
  const bName = interaction.options.getString('사업체이름');
  const staffId = interaction.options.getUser('직원').id;
  const level = interaction.options.getString('직급');

  const checkPermRes = await checkPerm('exe', interaction, bName);
  if (!checkPermRes) return noPerm(interaction);
  if (checkPermRes === 2) return noB(interaction);

  if (level === 'f') {
    const delRes = await delMem(staffId, bName);
    if (delRes.count != 0)
      return await interaction.reply(
        `<@${staffId}>직원이 \`${bName}\`사업체에서 정상적으로 해고되었습니다.`
      );
    else return await interaction.reply(`직원을 해고하는데 실패했습니다.`);
  }

  let newStaff;
  const chkMemRes = await checkMem(staffId, bName);
  if (chkMemRes) {
    await updMem(staffId, bName, level);
    newStaff = await checkMem(staffId, bName);
  } else {
    newStaff = await regMem(staffId, bName, level);
  }
  const setLevel = {
    c: '사장',
    e: '임원',
    s: '직원',
    v: '휴무',
  };

  await interaction.reply(
    `직원 등록/수정이 완료되었습니다.\n사업체 이름 : \`${
      newStaff.businessName
    }\`\n직원 : <@${newStaff.discordId}>\n직급 : ${setLevel[newStaff.level]}`
  );
};
