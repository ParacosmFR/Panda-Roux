const { SlashCommandBuilder } = require('@discordjs/builders');
const { GuildMember, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { use } = require('express/lib/application');
const path = require('path');
const root = path.dirname(require.main.filename);

function to_logs(interaction, guildConfig, user, reason) {
    const syschannel = (interaction.guild.channels.cache.get(guildConfig.logChannel));
    const embded = new MessageEmbed ()
    .setAuthor({name: `${interaction.guild.name}`})
    .setTitle(`Nouveau Kick`)
    .setDescription(`Utilisateur : <@${user.id}> | Raison : ${reason}`)
    .setColor(15548997)
    .setTimestamp();
    syschannel.send({ embeds: [embded] });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kick member')
        .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('reason of the kick').setRequired(true)),
	async execute(interaction) {
        const guild = interaction.guild;
        const author = interaction.member;
        configfile = require(root +`/data/guilds/${interaction.guild.id}.json`);
        if (configfile.moderation == false) { interaction.reply({content: "Commandes de modération désactivées sur ce serveur", ephemeral:true}); return};
        if(author.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const user = interaction.options.getMember('user');
            const reason = interaction.options.getString('reason');
            if(!user.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                private = await user.createDM(true);
                private.send(`Vous avez été kick de **${interaction.guild.name}**\n Raison : ${reason} | *Pour toute question, contactez un modérateur du serveur.*`);
                if(configfile.logs == true) {to_logs(interaction, configfile, user, reason);}
                await interaction.reply(`Utilisateur kické. Raison : ${reason}`);
                user.kick(reason);

            } else {
                await interaction.reply(`${user} is admin or moderator.`);
            }
        } else {
            await interaction.reply({content: "You dont have kick permissions.", ephemeral: true});
        }
	},
};