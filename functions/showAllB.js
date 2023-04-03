const getBs = require('../functions/prismaScripts/getAllBs');
const getMems = require('./prismaScripts/getMems');
const wageType = require('../utils/wageType');
const { maxWage, memberCntDividence } = require('../utils/wageVal');
const { checkPerm, noPerm } = require('../utils/checkPerm');

function paidWageCheck(paidRes, uId, wage) {
  if (!paidRes[uId]) {
    paidRes[uId] = wage;
    return wage;
  }
  if (paidRes[uId] + wage > maxWage) {
    const calced = maxWage - paidRes[uId];
    let res = 0;
    if (calced >= 0) res = calced;
    paidRes[uId] += res;
    return res;
  } else {
    paidRes[uId] += wage;
    return wage;
  }
}

function dist(type, mems, paidRes) {
  let total_wage = 0;
  let cCnt = 0;
  let eCnt = 0;
  let sCnt = 0;
  let vCnt = 0;
  for (const m of mems) {
    if (m.level !== 'v') {
      if (m.level === 'c') {
        const wage = paidWageCheck(paidRes, m.discordId, type[m.level] * 7);
        total_wage += wage;
        cCnt++;
      }
      if (m.level === 'e') {
        const wage = paidWageCheck(paidRes, m.discordId, type[m.level] * 7);
        total_wage += wage;
        eCnt++;
      }
      if (m.level === 's') {
        const wage = paidWageCheck(paidRes, m.discordId, type[m.level] * 7);
        total_wage += wage;
        sCnt++;
      }
    } else {
      vCnt++;
    }
  }
  let message = `${cCnt}/${eCnt}/${sCnt}/${vCnt}`;
  return { message, total_wage };
}

function addMessage(msgArray, content) {
  if (msgArray[msgArray.length - 1].length + content.length > 2000)
    msgArray.push(content);
  else msgArray[msgArray.length - 1] += content;
}

module.exports = async function showAllB(interaction) {
  // Check Permission
  if (!(await checkPerm('gbd', interaction.user.id)))
    return noPerm(interaction);

  await interaction.reply(`사업체 옆 숫자는 (사장/임원/직원/휴무) 입니다.`);

  const businesses = await getBs();
  const activated = businesses.filter((e) => e.activated);
  const deactivated = businesses.filter((e) => !e.activated);
  const paidRes = {};
  let message = [''];
  let total_wage = 0;
  for (const b of activated) {
    const mems = await getMems(b.name);
    const c = mems.filter((e) => e.level === 'c');
    const e = mems.filter((e) => e.level === 'e');
    const s = mems.filter((e) => e.level === 's');
    const v = mems.filter((e) => e.level === 'v');
    if (e.length + s.length >= memberCntDividence) {
      const distRes = dist(wageType.type3, mems, paidRes);
      addMessage(
        message,
        `사업체 이름 : **${b.name}** (${distRes.message})\n사업체 채널 : <#${b.channelId}>\n\n`
      );
      total_wage += distRes.total_wage;
    } else if (
      e.length + s.length < memberCntDividence &&
      e.length + s.length != 0
    ) {
      const distRes = dist(wageType.type2, mems, paidRes);
      addMessage(
        message,
        `사업체 이름 : **${b.name}** (${distRes.message})\n사업체 채널 : <#${b.channelId}>\n\n`
      );
      total_wage += distRes.total_wage;
    } else {
      const distRes = dist(wageType.type1, mems, paidRes);
      addMessage(
        message,
        `사업체 이름 : **${b.name}** (${distRes.message})\n사업체 채널 : <#${b.channelId}>\n\n`
      );
      total_wage += distRes.total_wage;
    }
  }
  for (let i of message) {
    await interaction.followUp(i);
  }
  if (deactivated.length != 0) {
    let deactivatedMessage = `비활성화 된 사업체 목록입니다.\n\n`;
    for (let i of deactivated) {
      deactivatedMessage += `\`${i.name}\`\n`;
    }
    await interaction.followUp(deactivatedMessage);
  }
  await interaction.followUp(
    `총 급여 : ${total_wage} **BTC**\n근벅단 수수료 : ${Math.floor(
      (total_wage * 7) / 100
    )} **BTC** \n\n합계 : ${
      total_wage + Math.floor((total_wage * 7) / 100)
    } **BTC**`
  );
};
