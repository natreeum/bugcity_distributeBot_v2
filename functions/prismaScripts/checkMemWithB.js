const { prisma } = require('../../prisma/prisma');

module.exports = async function (uId, bName) {
  try {
    const member = await prisma.users.findFirst({
      where: { discordId: uId, businessName: bName },
    });
    return member;
  } catch (e) {
    return null;
  }
};
