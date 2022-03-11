const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('covid')
		.setDescription('Give some covid infos'),
	async execute(interaction) {
        axios.get('https://raw.githubusercontent.com/CovidTrackerFr/covidtracker-data/master/data/france/stats/saturation_rea_regions.json').then(function(response) {
            const embded = new MessageEmbed();
            embded.setTitle("Infos covid France");
            embded.setImage("https://files.covidtracker.fr/covidtracker_vect.svg");
            embded.setDescription("Tension hospitalière. Si supérieur à 100%, alors les patients Covid19 occupent plus de lits de réanimation qu'il n'y en avait avant l'épidémie.");
            embded.addFields(
                {name:"Ile de France:", value: `${response.data['Ile-de-France']}%`},
                {name:"Auvergne-Rhône-Alpes:", value: `${response.data['Auvergne-Rhône-Alpes']}%`},
                {name:"Bretagne:", value: `${response.data['Bretagne']}%`},
                {name:"Bourgogne-Franche-Comté:", value: `${response.data['Bourgogne-Franche-Comté']}%`},
                {name:"Hauts-de-France:", value: `${response.data['Hauts-de-France']}%`},
                {name:"Grand Est:", value: `${response.data['Grand Est']}%`},
            )
            embded.setFooter("données récupérées grâce à covidtracker.fr");
            interaction.reply({ embeds: [ embded ] });
        });
	},
};
