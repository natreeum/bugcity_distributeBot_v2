const getMems = require('../functions/prismaScripts/getMems');
const { ADMIN, GBD_STAFF, OPERATOR_ROLE_ID } = require('./wageVal');

function checkAdmin(interaction) {
  return (
    ADMIN.includes(interaction.user.id) ||
    interaction.member.roles.has(OPERATOR_ROLE_ID)
  );
}
async function checkGBDExist() {
  const GBD = await getMems('근로벅지공단');
  if (GBD.length === 0) return false;
  else return GBD;
}

async function checkGBD(uId) {
  let check = await checkGBDExist();
  if (!check) check = GBD_STAFF.includes(uId);
  else {
    const [findStaff] = check.filter((e) => e.discordId === uId);
    if (!findStaff) check = false;
    else if (
      findStaff.level === 'c' ||
      findStaff.level === 'e' ||
      findStaff.level === 's'
    )
      check = true;
    else check = false;
  }
  return check;
}

async function checkPerm(type, interaction, bName) {
  const uId = interaction.user.id;
  if (type === 'admin') return checkAdmin(interaction);
  if (type === 'gbd') return checkAdmin(interaction) || checkGBD(uId);
  if (type === 'ceo') {
    const mems = await getMems(bName);
    if (mems.length === 0) return 2;
    let [filteredMem] = mems.filter((e) => e.discordId === uId);
    if (!filteredMem) filteredMem = { level: 'uauthorized' };
    return (
      checkAdmin(interaction) ||
      (await checkGBD(uId)) ||
      filteredMem.level === 'c'
    );
  }
  if (type === 'exe') {
    const mems = await getMems(bName);
    if (mems.length === 0) return 2;
    let [filteredMem] = mems.filter((e) => e.discordId === uId);
    if (!filteredMem) filteredMem = { level: 'uauthorized' };
    return (
      checkAdmin(uId) ||
      (await checkGBD(uId)) ||
      filteredMem.level === 'c' ||
      filteredMem.level === 'e'
    );
  }
}

async function noPerm(i) {
  return i.reply({
    content: `명령어를 실행할 권한이 없습니다.`,
    ephemeral: true,
  });
}

async function noB(i) {
  return i.reply({
    content: `해당 사업체가 존재하지 않습니다.`,
    ephemeral: true,
  });
}

module.exports = {
  checkPerm,
  noPerm,
  noB,
};
