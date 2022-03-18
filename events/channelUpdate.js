const { Embed } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { find } = require('../utils/findConfig');

function channelName(channel, interaction, syschannel) {
        const embded = new MessageEmbed ()
        .setAuthor({name: `${interaction.guild.name}`})
        .setTitle(`Salon modifié : ${interaction.name} => ${channel.name}`)
        .setDescription(`channel id: ${channel.id}`)
        .setColor(3447003)
        .setTimestamp();
        syschannel.send({ embeds: [embded] });
}

function channelDesc(channel, interaction, syschannel) {
        const embded = new MessageEmbed ()
        .setAuthor({name: `${interaction.guild.name}`})
        .setTitle(`Description du salon ${channel.name} modifié.`)
        .setDescription(`<#${channel.id}> : ${interaction.topic} => ${channel.topic}`)
        .setColor(3447003)
        .setTimestamp();
        syschannel.send({ embeds: [embded] });
}

module.exports = {
	name: 'channelUpdate',
	async execute(client, interaction) {
                const guildConfig = find(interaction.guild.id);
                if(guildConfig == undefined) {console.log("Not found"); return;}
                if(guildConfig.logs == true) {
                        const syschannel = (interaction.guild.channels.cache.get(guildConfig.logChannel));
                        channel = await interaction.guild.channels.fetch(interaction.id);
                        if(channel.name != interaction.name) { channelName(channel, interaction, syschannel) };
                        if(interaction.threads.channel.topic != interaction.topic) { channelDesc(channel, interaction, syschannel) };
                }
	}
};