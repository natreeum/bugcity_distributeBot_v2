const checkMem = require('../functions/prismaScripts/checkMemWithB');
const regMem = require('../functions/prismaScripts/regMem');
const delMem = require('../functions/prismaScripts/delMem');
const updMem = require('../functions/prismaScripts/updateMem');

module.exports = async function member(interaction) {
  const business = interaction.options.getString('사업체이름');
  const staffId = interaction.options.getUser('직원').id;
  const level = interaction.options.getString('직급');

  if (level === 'f') {
    const delRes = await delMem(staffId, business);
    if (delRes.count != 0)
      return await interaction.reply(`직원이 정상적으로 해고되었습니다.`);
    else return await interaction.reply(`직원을 해고하는데 실패했습니다.`);
  }

  let newStaff;
  const chkMemRes = await checkMem(staffId, business);
  if (chkMemRes) {
    await updMem(staffId, business, level);
    newStaff = await checkMem(staffId, business);
  } else {
    newStaff = await regMem(staffId, business, level);
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
