const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fouet')
		.setDescription('Fouette un autre utilisateur')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        if(user != undefined) {
            await interaction.reply(`${interaction.user} fouette ${user} :D`);
        } else {
            await interaction.reply(`${interaction.user} s'auto flagelle :D`);
        }
	},
};
