const commandBuilder = require(`../slashCommands/commandBuilder`);
const register = require('../functions/register');
const update = require('../functions/update');
const remove = require('../functions/remove');
const member = require('../functions/member');
const myBusinesses = require('../functions/myBusinesses');
const checkMembers = require('../functions/checkMembers');
const distribute = require('../functions/distribute');
const activate = require('../functions/activate');
const deactivate = require('../functions/deactivate');
const moveChannel = require('../functions/moveChannel');
const { checkPerm } = require('../utils/checkPerm');

module.exports = {
  data: commandBuilder,
  async execute(interaction) {
    // 등록
    if (interaction.options.getSubcommand() === '등록') {
      await register(interaction);
    }
    // 수정
    else if (interaction.options.getSubcommand() === '수정') {
      await update(interaction);
    }
    // 이사
    else if (interaction.options.getSubcommand() === '이사') {
      await moveChannel(interaction);
    }
    // 삭제
    else if (interaction.options.getSubcommand() === '삭제') {
      await remove(interaction);
    }
    // 직원
    else if (interaction.options.getSubcommand() === '직원') {
      await member(interaction);
    }
    // 사업체
    else if (interaction.options.getSubcommand() === '사업체') {
      await myBusinesses(interaction);
    }
    // 직원조회
    else if (interaction.options.getSubcommand() === '직원조회') {
      await checkMembers(interaction);
    }
    // 분배
    else if (interaction.options.getSubcommand() === '분배') {
      await distribute(interaction);
    }
    // 활성화
    else if (interaction.options.getSubcommand() === '활성화') {
      await activate(interaction);
    }
    // 비활성화
    else if (interaction.options.getSubcommand() === '비활성화') {
      await deactivate(interaction);
    }
  },
};
