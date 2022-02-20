const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('infos')
		.setDescription('Server infos'),
	async execute(interaction) {
		let owner = await interaction.guild.fetchOwner();
		let server = await interaction.guild.fetch();
		await interaction.reply(`**Propriétaire du Serveur :** ${owner.displayName}\nServeur crée le : ${interaction.guild.createdAt}\nNombre d'utilisateurs : ${server.approximateMemberCount}`);
	},
};
