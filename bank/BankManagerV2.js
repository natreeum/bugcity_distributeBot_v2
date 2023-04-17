const axios = require('axios');
const { api_v2, bugcity, storage } = require('../config');
const { log } = require('../utils/webhook');

class BankManager {
  async depositBTC(userId, amount) {
    if (!userId || !amount) return;
    try {
      const depositRes = await axios.post(
        `${api_v2}/v2/storages/${storage}/deposit`,
        { userId, point: amount, memo: 'Deposit to BUGkshireHathaway' },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': bugcity,
          },
        }
      );
      if (depositRes) {
        await log(`[DEPOSIT SUCCESS] <@${userId}> - ${amount} BTC`);
        console.log(`[DEPOSIT SUCCESS] ${userId} - ${amount} BTC`);
        return depositRes;
      } else {
        throw new Error('failed');
      }
    } catch (e) {
      console.error(e);
      console.log(`[DEPOSIT FAILED] <@${userId}> - ${amount} BTC`);
      return await log(`[DEPOSIT FAILED] <@${userId}> - ${amount} BTC`);
    }
  }
  async withdrawBTC(userId, amount) {
    if (!userId || !amount) return;
    try {
      const withdrawRes = await axios.post(
        `${api_v2}/v2/storages/${storage}/withdraw`,
        { userId, point: amount, memo: 'Withdraw to BUGkshireHathaway' },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': bugcity,
          },
        }
      );
      if (withdrawRes) {
        await log(`[WITHDRAW SUCCESS] <@${userId}> - ${amount} BTC`);
        console.log(`[WITHDRAW SUCCESS] ${userId} - ${amount} BTC`);
        return withdrawRes;
      } else {
        throw new Error('failed');
      }
    } catch (e) {
      console.error(e);
      console.log(`[WITHDRAW FAILED] <@${userId}> - ${amount} BTC`);
      return await log(`[WITHDRAW FAILED] <@${userId}> - ${amount} BTC`);
    }
  }
  async getBalance(userId) {
    if (!userId) return;
    try {
      const btcBalance = await axios.get(
        `${api_v2}/v2/users/${userId}/points/bugtc`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': bugcity,
          },
        }
      );
      return btcBalance.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  async getStorageBalance() {
    try {
      const storageBalance = await axios.get(
        `${api_v2}/v2/storages/${storage}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': bugcity,
          },
        }
      );
      return storageBalance.data.point.current;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = BankManager;
