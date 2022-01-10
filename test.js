const axios = require('axios');
const config = require('./config.json');
search = "Spider-Man: Homecoming"
axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&language="fr"&api_key=${config['film_api_v3']}`).then(function(response) {
    for(test of response.data.results)
    {
        console.log(test);
    }
});