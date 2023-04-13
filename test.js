const BankManager = require('./bank/BankManagerV2');
const bankManager = new BankManager();

bankManager.getStorageBalance().then(console.log);
