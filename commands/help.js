const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help command'),
	async execute(interaction) {
        const embded = new MessageEmbed();
        embded.setTitle("Help / Command list");
        embded.setDescription("Command list");
        const commandFiles = fs.readdirSync(root + '/commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(root +`/commands/${file}`);
            embded.addFields({name:`${command.data.name}`, value:`${command.data.description}`});
        }
        embded.setFooter("paracosm.fr");
        interaction.reply({ embeds: [ embded ], ephemeral: true });
	},
};