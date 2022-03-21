const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json');
const interface = require('./interface/web.js');
const fs = require('fs');
const verif = require('./data/verify_birthday.js');

function send_update() {
	
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MEMBERS"] });

client.once('ready', () => {
    console.log('Démarrage...');
	interface.init();
	verif.init(client);
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const folder of commandFiles) {
	const commandFolder = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'));
	for(const file of commandFolder) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.data.name, command);
	}
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client,...args));
	} else {
		client.on(event.name, (...args) => event.execute(client,...args));
	}
}

client.login(config.token);