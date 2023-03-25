const { prisma } = require('../../prisma/prisma');

module.exports = async function (uId, bName, level) {
  try {
    const updateRes = await prisma.users.updateMany({
      where: { businessName: bName, discordId: uId },
      data: { level },
    });
    return updateRes;
  } catch (e) {
    return null;
  }
};
