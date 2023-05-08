const axios = require('axios');
const { api_v2, bugcity, storage } = require('../config');
const { log } = require('../utils/webhook');

class BankManager {
  async depositBTC(userId, amount) {
    console.log(`Deposit [${userId}] [${amount}]`);
    return true;
  }
  async withdrawBTC(userId, amount) {
    console.log(`Withdraw [${userId}] [${amount}]`);
    return true;
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
