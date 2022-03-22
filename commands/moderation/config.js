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

function moderation(configfile) {
    if(configfile.moderation == false) {configfile.moderation = true} else {configfile.moderation = false};
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
        .addStringOption(option => option.setName('log-channel').setRequired(false).setDescription('Log Channel to set'))
        .addStringOption(option => option.setName('welcome-channel').setRequired(false).setDescription('Welcome Channel to set')),
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
            const welcomeChannel = interaction.options.getString('welcome-channel');
            if(option == "logs") {logs(configfile)};
            if(option == "moderation") {moderation(configfile)};
            if(logChannel != null) {configfile.logChannel = logChannel};
            if(welcomeChannel != null) {configfile.welcomeChannel = welcomeChannel};
            fs.writeFileSync(root +`/data/guilds/${interaction.guild.id}.json`, JSON.stringify(configfile));
            interaction.reply(`**configuration du serveur:**\nlogs : ${configfile.logs}\nsalon des logs : <#${configfile.logChannel}>\n modération: ${configfile.moderation}`);
        }
	},
};
