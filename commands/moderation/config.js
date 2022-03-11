const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Permissions, MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config.json');
const { find } = require('../../utils/findConfig');
var def = require('../../data/guilds/default.json');
const lang = require(`../../languages/${config.lang}.json`);
const root = path.dirname(require.main.filename);

function logs(configfile) {
    if(configfile.logs == false) {configfile.logs = true} else {configfile.logs = false};
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('set/modify the server conf')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('option to set')
                .setRequired(false)
                .addChoice('logs', 'logs')
                .addChoice('moderation', 'moderation'))
        .addStringOption(option => option.setName('log-channel').setRequired(false).setDescription('Enter a string')),
    async execute(interaction) {
        try {
            configfile = require(root +`/data/guilds/${interaction.guild.id}.json`);
        } catch (err) {
            fs.writeFileSync( root +`/data/guilds/${interaction.guild.id}.json`, JSON.stringify(def));
            configfile = def;
        }
        if(interaction.memberPermissions.has('ADMINISTRATOR')) {
            const option = interaction.options.getString('option');
            const logChannel = interaction.options.getString('log-channel');
            if(option == "logs") {logs(configfile)};
            if(logChannel != null) {configfile.logChannel = logChannel};
            fs.writeFileSync(root +`/data/guilds/${interaction.guild.id}.json`, JSON.stringify(configfile));
            interaction.reply(`**configuration du serveur:**\nlogs : ${configfile.logs}\nsalon des logs : <#${configfile.logChannel}>\n modération: ${configfile.moderation}`);
        }
	},
};
