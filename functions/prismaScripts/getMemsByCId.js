const { prisma } = require('../../prisma/prisma');

module.exports = async function (cId) {
  try {
    const bName = await prisma.business.findFirst({
      where: { channelId: cId },
    });
    const mems = await prisma.users.findMany({
      where: { businessName: bName },
    });
    return mems;
  } catch (e) {
    return null;
  }
};
