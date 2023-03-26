const { prisma } = require('../../prisma/prisma');

module.exports = async function (bName) {
  try {
    const mems = await prisma.users.findMany({
      where: { businessName: bName },
    });
    return mems;
  } catch (e) {
    return null;
  }
};
