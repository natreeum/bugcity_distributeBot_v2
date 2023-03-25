const { prisma } = require('../../prisma/prisma');

module.exports = async function regMem(uId, bName, level) {
  try {
    const newUser = await prisma.users.create({
      data: { discordId: uId, businessName: bName, level },
    });
    return newUser;
  } catch (e) {
    return null;
  }
};
