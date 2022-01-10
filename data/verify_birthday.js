const fs = require("fs");
const births = require('./birthday.json');
const discord = require('discord.js');
module.exports.init = function(client) {
    compare(client);
    setTimeout(compare, 86400000, client);
};

function compare(client)
{
    date = new Date();
    month = date.getMonth() +1;
    date = date.getDate() + '/' + month;
    for (const birth of births) {
        if (date == birth.user_birthday) {
            var channel = client.channels.cache.get(birth.server_channel);
            channel.send(`<@${birth.user_id}> Happy birthday to you :birthday:`);
        }
    }
}