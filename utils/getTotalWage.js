const paidWageCheck = require('../utils/paidWageCheck');
const getAllBs = require('../functions/prismaScripts/getAllBs');
const getMems = require('../functions/prismaScripts/getMems');
const wageType = require('../utils/wageType');

module.exports = {
  getTotalWage: async (maxWage) => {
    const paidRes = {};
    const AllB = await getAllBs();
    const filterActivated = AllB.filter((e) => e.activated);
    let total_wage = 0;
    for (const b of filterActivated) {
      const mems = await getMems(b.name);
      const eLevel = mems.filter((e) => e.level === 'e');
      const sLevel = mems.filter((e) => e.level === 's');
      const bTypeDivider = eLevel.length + sLevel.length;
      let type;
      if (bTypeDivider === 0) {
        type = wageType.type1;
      } else if (bTypeDivider < 4 && bTypeDivider > 0) {
        type = wageType.type2;
      } else {
        type = wageType.type3;
      }
      console.log(type);
      for (const m of mems) {
        console.log(m.level);
        const wage = paidWageCheck(
          paidRes,
          m.discordId,
          type[m.level] * 7,
          maxWage
        );
        console.log(wage);
        if (wage) total_wage += wage;
      }
    }
    return total_wage;
  },
};
