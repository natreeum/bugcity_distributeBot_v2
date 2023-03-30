const { prisma } = require('../../prisma/prisma');

module.exports = async function (bName, cId) {
  try {
    const updateRes = await prisma.business.update({
      where: { name: bName },
      data: { channelId: cId },
    });
    return updateRes;
  } catch (e) {
    return null;
  }
};
