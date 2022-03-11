const fs = require("fs");
const discord = require('discord.js');
module.exports.find = function(id) {
    try {
        const guildConfig = require(`../data/guilds/${id}.json`);
        return (guildConfig);
    } catch {
        return (undefined);
    }
};
