const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coffee')
		.setDescription('Give a coffee to a user')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        if(user != undefined) {
            await interaction.reply(`${interaction.user} donne un **café** bien chaud et fumant à ${user}`);
        } else {
            await interaction.reply(`${interaction.user} boit un super café du matin, ou du soir`);
        }
	},
};