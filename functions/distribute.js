const getBs = require('../functions/prismaScripts/getAllBs');
const getMems = require('./prismaScripts/getMems');
const wageType = require('../utils/wageType');
const { memberCntDividence } = require('../utils/wageVal');
const { checkPerm, noPerm } = require('../utils/checkPerm');
const paidWageCheck = require('../utils/paidWageCheck');
const { getTotalWage } = require('../utils/getTotalWage');
const BankManager = require('../bank/BankManagerV2');
const bankManager = new BankManager();

async function dist(type, mems, paidRes, maxWage) {
  let cMessage = '**사장**\n';
  let eMessage = '**임원**\n';
  let sMessage = '**알바**\n';
  let vMessage = '**휴무**\n';
  for (const m of mems) {
    if (m.level !== 'v') {
      if (m.level === 'c') {
        const wage = paidWageCheck(
          paidRes,
          m.discordId,
          type[m.level] * 7,
          maxWage
        );
        // wage 만큼 m.discordId 에게 입금
        const distRes = await bankManager.withdrawBTC(m.discordId, wage);
        if (distRes) cMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        else
          cMessage += `<@${m.discordId}>형, ${wage} **BTC** 분배 실패! <@251349298300715008>에게 문의해주세요!\n`;
      }
      if (m.level === 'e') {
        const wage = paidWageCheck(
          paidRes,
          m.discordId,
          type[m.level] * 7,
          maxWage
        );
        // wage 만큼 m.discordId 에게 입금
        const distRes = await bankManager.withdrawBTC(m.discordId, wage);
        if (distRes) eMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        else
          eMessage += `<@${m.discordId}>형, ${wage} **BTC** 분배 실패! <@251349298300715008>에게 문의해주세요!\n`;
      }
      if (m.level === 's') {
        const wage = paidWageCheck(
          paidRes,
          m.discordId,
          type[m.level] * 7,
          maxWage
        );
        // wage 만큼 m.discordId 에게 입금
        const distRes = await bankManager.withdrawBTC(m.discordId, wage);
        if (distRes) sMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        else
          sMessage += `<@${m.discordId}>형, ${wage} **BTC** 분배 실패! <@251349298300715008>에게 문의해주세요!\n`;
      }
    } else {
      vMessage += `<@${m.discordId}>\n`;
    }
  }
  let message = '';
  if (cMessage.length > 8) {
    message += cMessage;
  }
  if (eMessage.length > 8) {
    message += eMessage;
  }
  if (sMessage.length > 8) {
    message += sMessage;
  }
  if (vMessage.length > 8) {
    message += vMessage;
  }
  return message;
}

module.exports = async function distribute(interaction) {
  const maxWageOption = interaction.options.getInteger('주급상한선');

  // Check Permission
  if (!(await checkPerm('admin', interaction))) return noPerm(interaction);

  // Check total wage
  const total_wage = await getTotalWage(maxWageOption);
  console.log(`Total Wage : ${total_wage}`);

  const GBDFee = Math.floor(total_wage * 0.07);

  const BUGkshireBalance = await bankManager.getStorageBalance();
  console.log(`BUGkshireBalance : ${BUGkshireBalance}`);

  if (BUGkshireBalance < total_wage + GBDFee)
    return interaction.reply({
      content: `벅크셔 해서웨이에 잔액이 부족합니다... 아마 직원명단 변동이 있었나봐요..\n${
        total_wage + GBDFee - BUGkshireBalance
      } BTC가 부족합니다!`,
    });

  await bankManager.withdrawBTC('251349298300715008', GBDFee);

  const businesses = await getBs();
  const activated = businesses.filter((e) => e.activated);
  const paidRes = {};
  await interaction.reply(`사업체 급여 분배를 시작합니다.`);
  for (const b of activated) {
    const mems = await getMems(b.name);
    const c = mems.filter((e) => e.level === 'c');
    const e = mems.filter((e) => e.level === 'e');
    const s = mems.filter((e) => e.level === 's');
    const v = mems.filter((e) => e.level === 'v');
    if (e.length + s.length >= memberCntDividence) {
      await interaction.followUp(
        `사업체 이름 : **${b.name}**\n사업체 채널 : <#${
          b.channelId
        }>\n\n${await dist(wageType.type3, mems, paidRes, maxWageOption)}`
      );
    } else if (
      e.length + s.length < memberCntDividence &&
      e.length + s.length != 0
    ) {
      await interaction.followUp(
        `사업체 이름 : **${b.name}**\n사업체 채널 : <#${
          b.channelId
        }>\n\n${await dist(wageType.type2, mems, paidRes, maxWageOption)}`
      );
    } else {
      await interaction.followUp(
        `사업체 이름 : **${b.name}**\n사업체 채널 : <#${
          b.channelId
        }>\n\n${await dist(wageType.type1, mems, paidRes, maxWageOption)}`
      );
    }
  }
  await interaction.followUp('전체 사업체에 대해 분배가 완료되었습니다!');
};
