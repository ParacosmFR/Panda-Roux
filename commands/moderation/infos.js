const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('infos')
		.setDescription('Server infos'),
	async execute(interaction) {
		let owner = await interaction.guild.fetchOwner();
		let server = await interaction.guild.fetch();
		if(server != null && owner != null) {
			console.log(server);
			const embded = new MessageEmbed()
				.setTitle(`Infos du serveur : ${server.name}`)
				.setDescription(`Propriétaire : ${owner.displayName}`)
				.addFields({name:"Serveur crée le :", value: `${interaction.guild.createdAt}`},
				{name:"Nombre d'utilisateurs :", value: `${server.approximateMemberCount}`});
			await interaction.reply({ embeds: [embded], ephemeral: true});
		}
	},
};
