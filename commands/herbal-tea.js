const { SlashCommandBuilder } = require('@discordjs/builders');
const fragance = ["verveine", "menthe", "camomille", "tilleule", "good-night", "fleur d\'oranger"];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('herbal-tea')
		.setDescription('Choosing a fragance of herbel-tea for you or your friend')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const item = fragance[Math.floor(Math.random()*fragance.length)];
        if(user != undefined) {
            await interaction.reply(`${interaction.user} offre une tisane de ${item} à ${user}`);
        } else {
            await interaction.reply(`${interaction.user} boit une super tisane de ${item}`);
        }
	},
};