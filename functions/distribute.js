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
        cMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        // wage 만큼 m.discordId 에게 입금
        await bankManager.withdrawBTC(m.discordId, wage);
      }
      if (m.level === 'e') {
        const wage = paidWageCheck(
          paidRes,
          m.discordId,
          type[m.level] * 7,
          maxWage
        );
        eMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        // wage 만큼 m.discordId 에게 입금
        await bankManager.withdrawBTC(m.discordId, wage);
      }
      if (m.level === 's') {
        const wage = paidWageCheck(
          paidRes,
          m.discordId,
          type[m.level] * 7,
          maxWage
        );
        sMessage += `${wage} **BTC** : <@${m.discordId}>\n`;
        // wage 만큼 m.discordId 에게 입금
        await bankManager.withdrawBTC(m.discordId, wage);
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
  // Check Permission
  if (!(await checkPerm('admin', interaction.user.id)))
    return noPerm(interaction);

  // Check total wage
  const total_wage = await getTotalWage();
  const BUGkshireBalance = await bankManager.getStorageBalance();
  if (BUGkshireBalance < total_wage)
    return interaction.reply({
      content: '벅크셔 해서웨이에 잔액이 부족합니다!',
      ephemeral: true,
    });

  const businesses = await getBs();
  const activated = businesses.filter((e) => e.activated);
  const paidRes = {};
  const maxWageOption = interaction.options.getInteger('주급상한선');
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
