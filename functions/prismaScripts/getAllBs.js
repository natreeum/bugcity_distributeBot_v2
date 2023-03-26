const { prisma } = require('../../prisma/prisma');

module.exports = async function () {
  try {
    const getRes = await prisma.business.findMany();
    return getRes;
  } catch (e) {
    return null;
  }
};
