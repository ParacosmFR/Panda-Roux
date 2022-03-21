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
        embded.setTitle("Liste des commandes");
        embded.setDescription("Listes des commandes d'animations");
        const commandFiles = fs.readdirSync(root + '/commands/animation/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(root +`/commands/animation/${file}`);
            embded.addFields({name:`${command.data.name}`, value:`${command.data.description}`});
        }
        embded.setFooter("paracosm.fr");
        interaction.reply({ embeds: [ embded ], ephemeral: true });
	},
};