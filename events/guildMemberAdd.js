const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	execute(client, interaction) {
        const channel = (interaction.guild.channels.cache.get(interaction.guild.systemChannelId));
        console.log(interaction);
        channel.send(`Bienvenue sur **${interaction.guild.name}** <@${interaction.user.id}> ! Passe du bon temps parmi nous ! 🧁`);
	},
};