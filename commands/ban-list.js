const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Permissions, MessageEmbed } = require('discord.js');
const config = require('../config.json');
const lang = require(`../languages/${config.lang}.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban-list')
		.setDescription('Ban list'),
	async execute(interaction) {
        if(interaction.memberPermissions.has('BAN_MEMBERS')) {
            const mapping = await interaction.guild.bans.fetch();
            const test = Array.from(mapping);
            const embded = new MessageEmbed();
            embded.setTitle("Ban list of the server");
            embded.setDescription("Ban list, with all the banned members");
            test.forEach(element => {
                embded.addFields(
                    {name: element[1]['user'].username, value: `Raison :${element[1]['reason']}`},
                )
            });
            embded.setFooter(`${lang.ONLY_FOR_MODS}`);
            interaction.reply({ embeds: [ embded ] });
        } else {
            interaction.reply(`***:no_entry_sign: | ${lang.PERMISSIONS_ERROR}***`);
        }
	},
};
