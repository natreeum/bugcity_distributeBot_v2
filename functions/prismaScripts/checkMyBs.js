const { prisma } = require('../../prisma/prisma');

module.exports = async function (uId) {
  try {
    const myBs = await prisma.users.findMany({ where: { discordId: uId } });
    return myBs;
  } catch (e) {
    return null;
  }
};
