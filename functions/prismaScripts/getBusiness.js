const { prisma } = require('../../prisma/prisma');

module.exports = async function (bName) {
  try {
    const bsns = await prisma.business.findUnique({ where: { name: bName } });
    return bsns;
  } catch (e) {
    return null;
  }
};
