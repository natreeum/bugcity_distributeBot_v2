const { SlashCommandBuilder } = require('discord.js');

const commandBuilder = new SlashCommandBuilder()
  .setName('근벅단')
  .setDescription('근로벅지공단입니다.')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('등록')
      .setDescription('사업체를 등록합니다.')
      .addStringOption((option) =>
        option
          .setName('사업체이름')
          .setDescription(`정확한 사업체 이름을 입력하셔야합니다.`)
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('수정')
      .setDescription('사업체이름을 수정합니다.')
      .addStringOption((option) =>
        option
          .setName('사업체명')
          .setDescription(
            `기존 사업체 이름을 입력하세요. 정확한 사업체명을 입력하셔야 합니다.`
          )
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('새사업체명')
          .setDescription(`새 사업체 이름을 입력하세요.`)
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('직원')
      .setDescription('사업체 직원을 등록/수정합니다.')
      .addStringOption((option) =>
        option
          .setName('사업체명')
          .setDescription(`정확한 사업체명을 입력하셔야합니다.`)
          .setRequired(true)
      )
      .addUserOption((option) =>
        option
          .setName('직원')
          .setDescription(`직원을 선택하세요`)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('직급')
          .setDescription('직급을 골라주세요')
          .addChoices(
            { name: '사장', value: 'c' },
            { name: '임원', value: 'e' },
            { name: '직원', value: 's' },
            { name: '휴무', value: 'v' },
            { name: '해고', value: 'f' }
          )
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('분배')
      .setDescription('주급을 분배합니다. ')
      .addStringOption((option) =>
        option
          .setName('company')
          .setDescription(`정확한 사업체명을 입력하셔야합니다.`)
          .setRequired(true)
      )
  );

module.exports = commandBuilder;
