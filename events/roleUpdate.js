const { MessageEmbed } = require('discord.js');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
module.exports = {
	name: 'roleUpdate',
	async execute(client, roleUpdate) {
        const channel = (roleUpdate.guild.channels.cache.get(roleUpdate.guild.systemChannelId));
        role = await roleUpdate.guild.roles.fetch(roleUpdate.id);

        if(role.name != roleUpdate.name) {
            const embded = new MessageEmbed ()
            .setAuthor({name: `${roleUpdate.guild.name}`})
            .setTitle(`Role modifié : ${roleUpdate.name} => ${role.name}`)
            .setDescription(`rôle id: ${role.id}`)
            .setColor(3447003)
            .setTimestamp();
            channel.send({ embeds: [embded] });
        }
	},
};