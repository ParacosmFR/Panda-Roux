const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const lang = require(`../languages/${config.lang}.json`);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Give a hug to a user')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        if(user != undefined) {
            await interaction.reply(`${interaction.user} ${lang.HUG} ${user}`);
        } else {
            await interaction.reply(`${interaction.user} ${lang.SINGLE_HUG}`);
        }
	},
};