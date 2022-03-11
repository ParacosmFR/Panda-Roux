const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cookie')
		.setDescription('Give a cookie to a user')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        if(user != undefined) {
            await interaction.reply(`${interaction.user} donne un :cookie: à ${user}`);
        } else {
            await interaction.reply(`${interaction.user} mange un :cookie:`);
        }
	},
};
