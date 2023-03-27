const { prisma } = require('../../prisma/prisma');

module.exports = async (bName, mode) => {
  try {
    let bsns;
    if (mode == 'activate')
      bsns = await prisma.business.update({
        where: { name: bName },
        data: { activated: true },
      });
    if (mode == 'deactivate')
      bsns = await prisma.business.update({
        where: { name: bName },
        data: { activated: false },
      });
    return bsns;
  } catch (e) {
    return null;
  }
};
