const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tea')
		.setDescription('Give a tea to a user')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        if(user != undefined) {
            await interaction.reply(`${interaction.user} donne un **thé** noir bien chaud et fumant à ${user}`);
        } else {
            await interaction.reply(`${interaction.user} boit un super thé dès matin, ou le soir`);
        }
	},
};