const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const news = ["Dit on le pain au chocolat ou chocolatine ?", "Le lait avant ou après les céréales ?", "Faut il sortir du nucléaire ?"];
const law = ["LOI - Ce gouvernement abolirait le droit du sol.", "LOI - Ce gouvernement arrêterait de financer la culture.",
"LOI - Ce gouvernement interdirait le tourisme spatial.", "LOI - Ce gouvernement rétablirait la peine de mort."];
const debats = [news, law];
module.exports = {
	data: new SlashCommandBuilder()
		.setName('debat')
		.setDescription('Choosing a subject for you'),
	async execute(interaction) {
        const theme = debats[Math.floor(Math.random()*debats.length)];
        item  = theme[Math.floor(Math.random()*theme.length)];
        const embded = new MessageEmbed();
        embded.setTitle("Débat choisi : ");
        embded.setDescription(`${item}`);
        embded.setColor(RANDOM);
        embded.footer(`@Panda Roux | 2022`);
        interaction.reply({ embeds: [ embded ]});
	},
};