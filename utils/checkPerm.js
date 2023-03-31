const getMems = require('../functions/prismaScripts/getMems');

const ADMIN = ['251349298300715008'];
const GBD_STAFF = [];
function checkAdmin(uId) {
  return ADMIN.includes(uId);
}
async function checkGBDExist() {
  const GBD = await getMems('근로벅지공단');
  if (GBD.length === 0) return false;
  else return GBD;
}
async function checkGBD(uId) {
  let check = await checkGBDExist();
  if (!check) check = GBD_STAFF.includes(uId);
  return GBD_STAFF.includes(uId);
}

async function checkPerm(type, uId, bName) {
  if (type === 'admin') return checkAdmin(uId);
  if (type === 'gbd') return checkAdmin(uId) || checkGBD(uId);
  if (type === 'ceo') {
    const mems = await getMems(bName);
    if (mems.length === 0) return 2;
    let [filteredMem] = mems.filter((e) => e.discordId === uId);
    if (!filteredMem) filteredMem = { level: 'uauthorized' };
    return (
      checkAdmin(uId) || (await checkGBD(uId)) || filteredMem.level === 'c'
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
