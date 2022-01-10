const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trending-movies')
		.setDescription('Give the trending movies of the day'),
	async execute(interaction) {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${config['film_api_v3']}`).then(function(response) {
            const embded = new MessageEmbed();
            embded.setTitle("Trending Movies");
            embded.setDescription("Trending movies for the day");
            var i = 0;
            for (movie of response.data.results) {
                i++;
                if(i < 11) {
                    embded.addFields({name:`${movie.title} | ${movie.vote_average}/10`, value:`\u200B`});
                }
            }
            embded.setFooter(`themoviedb.org | total trends : ${i}`);
            interaction.reply({ embeds: [ embded ] });
        });
	},
};