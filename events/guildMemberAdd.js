const { MessageEmbed } = require('discord.js');
const { find } = require('../utils/findConfig');

function to_logs(interaction, guildConfig, user) {
    const syschannel = (interaction.guild.channels.cache.get(guildConfig.logChannel));
    const embded = new MessageEmbed ()
    .setAuthor({name: `${interaction.guild.name}`})
    .setTitle(`Nouveau Membre`)
    .setDescription(`Utilisateur : <@${user.id}>`)
    .setColor(15548997)
    .setTimestamp();
    syschannel.send({ embeds: [embded] });
}
module.exports = {
	name: 'guildMemberAdd',
	execute(client, interaction) {
		const guildConfig = find(interaction.guild.id);
        if (guildConfig == null) {return;}
        const channel = (interaction.guild.channels.cache.get(guildConfig.welcomeChannel));
        channel.send(`Bienvenue sur **${interaction.guild.name}** <@${interaction.user.id}> ! Passe du bon temps parmi nous ! 🧁`);
		if(guildConfig.logs == true) {to_logs(interaction, guildConfig, interaction.user)};
	},
};