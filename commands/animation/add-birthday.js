const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);
births = require(root + '/data/birthday.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-birthday')
		.setDescription('add my birthday date')
        .addIntegerOption(option => option.setName('day').setDescription('add a day').setRequired(true))
        .addIntegerOption(option => option.setName('month').setDescription('add a month').setRequired(true))
        .addIntegerOption(option => option.setName('year').setDescription('add a year').setRequired(true)),
	async execute(interaction) {
        const day = interaction.options.getInteger('day');
        const month = interaction.options.getInteger('month');
        const year = interaction.options.getInteger('year');
        if (verify_if_exist(interaction.user.id, interaction.guild.id)) {
            await interaction.reply(`your birthday, is added (${day}/${month}/${year})`);
            const mybirth = {
                "user_id": interaction.user.id,
                "user_birthday": day + '/' + month,
                "server_id": interaction.guild.id,
                "server_channel": interaction.channel.id
            }
            births.push(mybirth);
            fs.writeFileSync(root + '/data/birthday.json', JSON.stringify(births));
            console.log(births);
        } else {
            await interaction.reply(`your birthday, is already registered`);
        }
	},
};

function verify_if_exist(user_id, server_id)
{
    for (const data of births) {
        if(data.user_id == user_id && data.server_id == server_id) {
            return (false);
        }
    }
    return(true);
}