const { prisma } = require('../../prisma/prisma');

module.exports = async function (uId, bName) {
  try {
    const delRes = await prisma.users.deleteMany({
      where: { discordId: uId, businessName: bName },
    });
    return delRes;
  } catch (e) {
    return null;
  }
};
