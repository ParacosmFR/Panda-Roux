const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const axios = require('axios');
const config = require('../../config.json');

const button = new MessageButton()
	.setLabel('Most popular movies page')
	.setStyle('LINK')
    .setURL('https://www.themoviedb.org/movie');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('popular-movies')
		.setDescription('Give the most popular movies')
        .addIntegerOption(option => option.setName('year').setDescription('select a year')),
	async execute(interaction) {
        if(config['film_api_v3'] == null) { interaction.reply({content: "Movie API is not defined", ephemeral: true}); return};
        if(interaction.options.getInteger("year") == null)
        {
            axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${config['film_api_v3']}`).then(function(response) {
                const embded = new MessageEmbed();
                embded.setTitle("Popular Movies");
                embded.setDescription("List of the most popular movies");
                var i = 0;
                for (movie of response.data.results) {
                    i++;
                    if(i < 11) {
                        embded.addFields({name:`${movie.title} | ${movie.vote_average}/10`, value:`\u200B`});
                    }
                }
                embded.setFooter(`themoviedb.org | total : ${i}`);
                const row = new MessageActionRow().addComponents(button);
                interaction.reply({ embeds: [ embded ], components: [row] });
            });
        } else {
            year = interaction.options.getInteger("year");
            axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_year=${year}&api_key=${config['film_api_v3']}`).then(function(response) {
                const embded = new MessageEmbed();
                embded.setTitle(`Popular Movies in ${year}`);
                embded.setDescription("List of the most popular movies");
                var i = 0;
                for (movie of response.data.results) {
                    i++;
                    if(i < 11) {
                        embded.addFields({name:`${movie.title} | ${movie.vote_average}/10`, value:`\u200B`});
                    }
                }
                embded.setFooter(`themoviedb.org | total : ${i}`);
                const row = new MessageActionRow().addComponents(button);
                interaction.reply({ embeds: [ embded ], components: [row] });
            });
        }
	},
};