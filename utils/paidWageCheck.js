// const { maxWage } = require('../utils/wageVal');

module.exports = function paidWageCheck(paidRes, uId, wage, maxWage) {
  if (!paidRes[uId]) {
    paidRes[uId] = wage;
    console.log('type1');
    return wage;
  }
  if (paidRes[uId] + wage > maxWage) {
    const calced = maxWage - paidRes[uId];
    let res = 0;
    if (calced >= 0) res = calced;
    paidRes[uId] += res;
    console.log('type2');
    return res;
  } else {
    paidRes[uId] += wage;
    console.log('type3');
    return wage;
  }
};
