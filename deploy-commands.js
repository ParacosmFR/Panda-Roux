const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands');
for (const folder of commandFiles) {
	const commandFolder = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'));
	for(const file of commandFolder) {
		const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
