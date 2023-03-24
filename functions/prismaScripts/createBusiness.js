const { prisma } = require('../../prisma/prisma');

module.exports = async function (bName, uId) {
  try {
    const newB = await prisma.business.create({ data: { name: bName } });
    const newS = await prisma.users.create({
      data: { discordId: uId, businessName: bName, level: 'c' },
    });
    return { newB, newS };
  } catch (e) {
    return null;
  }
};
