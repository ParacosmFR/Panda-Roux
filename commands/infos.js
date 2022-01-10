const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('infos')
		.setDescription('Server infos'),
	async execute(interaction) {
		let owner = await interaction.guild.fetchOwner();
		await interaction.reply(`**Propriétaire du Serveur :** ${owner.displayName}\n`);
	},
};
