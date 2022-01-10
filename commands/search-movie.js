const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const config = require('../config.json');
i = 0;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('search-movie')
		.setDescription('Search for a moovie')
        .addStringOption(option => option.setName('search').setDescription('title to search').setRequired(true)),
	async execute(interaction) {
        search = interaction.options.getString('search');
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&language="fr"&api_key=${config['film_api_v3']}`).then(function(response) {
            const embded = new MessageEmbed();
            embded.setTitle("Search results");
            embded.setDescription("Search result for your input");
            for(movie of response.data.results)
            {

                if(i < 5)
                {
                    embded.addFields({name:`${movie.title} | ${movie.vote_average}/10`, value:`${movie.overview.slice(0, 250)}...`});
                }
                i++;
            }
            embded.setFooter(`themoviedb.org | total results : ${i}`);
            interaction.reply({ embeds: [ embded ], ephemeral: true });
	    });
    },
};