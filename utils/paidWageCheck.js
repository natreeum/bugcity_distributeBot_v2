const { maxWage } = require("../utils/wageVal");

module.exports = function paidWageCheck(
  paidRes,
  uId,
  wage,
  maxWageParam = maxWage
) {
  if (!paidRes[uId]) {
    paidRes[uId] = wage;
    return wage;
  }
  if (paidRes[uId] + wage > maxWageParam) {
    const calced = maxWageParam - paidRes[uId];
    let res = 0;
    if (calced >= 0) res = calced;
    paidRes[uId] += res;
    return res;
  } else {
    paidRes[uId] += wage;
    return wage;
  }
};
