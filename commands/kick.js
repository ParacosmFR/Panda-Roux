const { SlashCommandBuilder } = require('@discordjs/builders');
const { GuildMember } = require('discord.js');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kick member')
        .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true)),
	async execute(interaction) {
        const guild = interaction.guild;
        const author = interaction.member;
        if(author.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const user = interaction.options.getMember('user');
            if(!user.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                await interaction.reply("User have been kicked from server");
                user.kick();
            } else {
                await interaction.reply(`${user} is admin or moderator.`);
            }
        } else {
            await interaction.reply({content: "You dont have kick permissions.", ephemeral: true});
        }
	},
};