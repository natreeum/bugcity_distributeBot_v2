const getMems = require('../functions/prismaScripts/getMems');

const ADMIN = [];
const GBD_STAFF = [];
function checkAdmin(uId) {
  return ADMIN.includes(uId);
}
function checkGBD(uId) {
  return GBD_STAFF.includes(uId);
}

async function checkPerm(type, uId, bName) {
  if (type === 'admin') return checkAdmin(uId);
  if (type === 'gbd') return checkAdmin(uId) || checkGBD(uId);
  if (type === 'ceo') {
    const mems = await getMems(bName);
    const [filteredMem] = mems.filter((e) => e.discordId === uId);
    return checkAdmin(uId) || checkGBD(uId) || filteredMem.level === 'c';
  }
}

async function noPerm(i) {
  return i.reply({
    content: `명령어를 실행할 권한이 없습니다.`,
    ephemeral: true,
  });
}

module.exports = {
  checkPerm,
  noPerm,
};
