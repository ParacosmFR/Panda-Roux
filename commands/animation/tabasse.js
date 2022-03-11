const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tabasse')
        .setDescription('Tabasse un autre utilisateur')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if(user != undefined) {
            await interaction.reply(`${interaction.user} tabasse ${user} :D`);
        } else {
            await interaction.reply(`${interaction.user} s'auto tabasse:D`);
        }
    },
};