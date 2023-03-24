const { prisma } = require('../../prisma/prisma');

module.exports = async function (bName, newBName) {
  try {
    const bsns = await prisma.business.update({
      where: { name: bName },
      data: { name: newBName },
    });
    return bsns;
  } catch (e) {
    return null;
  }
};
