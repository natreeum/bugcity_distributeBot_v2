const { prisma } = require('../../prisma/prisma');

module.exports = async function (bName) {
  try {
    await prisma.users.deleteMany({
      where: { businessName: bName },
    });
    const delRes = await prisma.business.delete({ where: { name: bName } });
    return delRes;
  } catch (e) {
    return null;
  }
};
