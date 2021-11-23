// const fs = require('fs');
const Statcord = require("statcord.js");
const { MessageEmbed, Intents, Collection } = require('discord.js');
const config = require('./utils/config.js');
const DisTube = require('distube');
const functions = require('./utils/functions.js');
const keepAlive = require('./server');
const { Users } = require('./dbObjects');
const currency = new Collection();
const fetch = require("node-fetch")

require('./models/ExtendedMessage');

Reflect.defineProperty(currency, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

const axios = require('axios').default;

const apikey = process.env.HYPIXEL;

const HypixelAPIReborn = require('hypixel-api-reborn');
const hypixelAPIReborn = new HypixelAPIReborn.Client(apikey);

const Commando = require('discord.js-commando');

require('discord-reply');

const client = new Commando.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING],
	owner: config.discord.ownerID,
	commandPrefix: config.discord.prefix,
	disableEveryone: true,
	allowedMentions: {
        repliedUser: false
    }
});

const statcord = new Statcord.Client({
    client,
    key: "statcord.com-5VgWYpRXrZ7YE1PNmipi"
});

Array.prototype.unique = function () {
	var a = this.concat();
	for (var i = 0; i < a.length; ++i) {
		for (var j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j]) a.splice(j--, 1);
		}
	}

	return a;
};

client.functions = functions;
client.currency = currency;

require('@weky/inlinereply');
require('discord-buttons')(client);
const weky = require('weky');

const neko_client = require('nekos.life');
const neko = new neko_client();
const translate = require('@vitalets/google-translate-api');

client.nekos = neko;

const { DiscordTogether } = require('discord-together');

client.hypixelAPIReborn = hypixelAPIReborn;
client.HypixelAPIReborn = HypixelAPIReborn;

client.discordInstance = require('discord.js');

client.discordTogether = new DiscordTogether(client);

client.weky = weky;

const db = require('quick.db');

client.language = async (text, message) => {
	let lang = 'en';

	if (message.guild) {
		lang = db.has(`lang-${message.guild.id}`) ? db.get(`lang-${message.guild.id}`) : 'en';
	}
	
	if (lang == 'en') return text.toString();

	const translated = await translate(text, { from: 'en', to: lang });

	return translated.text.toString().replace(/< @ /g, '<@').replace(/<# /g, '<#').replace(/<@ /g, '<@').replace(/< # /g, '<#').replace(/ # /g, '#').replace(/＃/g, '#');
}

if (!Array.isArray(db.get('giveaways'))) db.set('giveaways', []);

const { GiveawaysManager } = require('discord-giveaways');

const GiveawayManager2 = class extends GiveawaysManager {
	// This function is called when the manager needs to get all giveaways which are stored in the database.
	async getAllGiveaways() {
		// Get all giveaways from the database
		return db.get('giveaways');
	}

	// This function is called when a giveaway needs to be saved in the database.
	async saveGiveaway(messageId, giveawayData) {
		// Add the new giveaway to the database
		db.push('giveaways', giveawayData);
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be edited in the database.
	async editGiveaway(messageId, giveawayData) {
		// Get all giveaways from the database
		const giveaways = db.get('giveaways');
		// Remove the unedited giveaway from the array
		const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageId !== messageId);
		// Push the edited giveaway into the array
		newGiveawaysArray.push(giveawayData);
		// Save the updated array
		db.set('giveaways', newGiveawaysArray);
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be deleted from the database.
	async deleteGiveaway(messageId) {
		// Get all giveaways from the database
		const giveaways = db.get('giveaways');
		// Remove the giveaway from the array
		const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageId !== messageId);
		// Save the updated array
		db.set('giveaways', newGiveawaysArray);
		// Don't forget to return something!
		return true;
	}
};

const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');

const distube = new DisTube.default(client, {
	searchSongs: 10,
	leaveOnFinish: true,
	searchCooldown: 30,
	emptyCooldown: 30,
	customFilters: {
		"crystalizer": "crystalizer=i=4",
		"speed": "atempo=1",
		"speed_125": "atempo=1.25",
		"speed_150": "atempo=1.5",
		"speed_175": "atempo=1.75",
		"speed_200": "atempo=2",
		"speed_025": "atempo=0.25",
		"speed_050": "atempo=0.5",
		"speed_075": "atempo=0.75",
		"rickroll": "bass=g=33,apulsator=hz=0.06,vibrato=f=2.5,tremolo,asetrate=48000*0.8",
		"cursed": "vibrato=f=6.5,tremolo,aresample=48000,asetrate=48000*1.25",
		"clear": "dynaudnorm=f=200",
		"bassboost": "bass=g=20,dynaudnorm=f=200",
		"8D": "apulsator=hz=0.08",
		"vaporwave": "aresample=48000,asetrate=48000*0.8",
		"nightcore": "aresample=48000,asetrate=48000*1.25",
		"phaser": "aphaser=in_gain=0.4",
		"tremolo": "tremolo",
		"vibrato": "vibrato=f=6.5",
		"reverse": "areverse",
		"treble": "treble=g=5",
		"normalizer": "dynaudnorm=f=200",
		"surrounding": "surround",
		"pulsator": "apulsator=hz=1",
		"subboost": "asubboost",
		"karaoke": "stereotools=mlev=0.03",
		"flanger": "flanger",
		"gate": "agate",
		"haas": "haas",
		"mcompand": "mcompand",
	},
	emitAddSongWhenCreatingQueue: false,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true
		}),
		new SoundCloudPlugin(),
	],
	ytdlOptions: {
		filter: 'audioonly',
		quality: 'highest',
		highWaterMark: 1 << 25,
	},
});

client.player = distube;
client.config = config;
client.emotes = client.config.emotes;
// client.filters = client.config.filters;
// client.commands = new Collection();
client.snipes = new Collection();

const manager = new GiveawayManager2(client, {
	default: {
		botsCanWin: false,
		embedColor: client.config.discord.accentColor,
		embedColorEnd: client.config.discord.accentColor,
		reaction: '🎉',
	},
});

client.giveawaysManager = manager;

const startDelim = 'tex$';
const endDelim = '$';

// const ascii = require('ascii-table');
// let table = new ascii('Commands');
// table.setHeading('Command', 'Status');

// fs.readdirSync('./commands').forEach((dirs) => {
// 	const commands = fs.readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith('.js'));

// 	for (const file of commands) {
// 		const command = require(`./commands/${dirs}/${file}`);
// 		if (command.name) {
// 			client.commands.set(command.name.toLowerCase(), command);
// 			table.addRow(file, 'Success');
// 		} else {
// 			table.addRow(file, 'Failed');
// 			continue;
// 		}
// 	}
// });

// console.log(table.toString());

distube.on('playSong', async (queue, track) => {
	queue.textChannel.send(`${queue.client.emotes.music} - Now playing **${track.name}** to ${queue.voiceChannel.toString()} ...`);
});

distube.on('addSong', async (queue, song) => {
	queue.textChannel.send(`${queue.client.emotes.success} - ${await client.language(`Added **${song.name}** to the queue!`, queue.textChannel.lastMessage)}`);
});

distube.on('addList', async (queue, playlist) => {
	queue.textChannel.send(`${queue.client.emotes.success} - ${await client.language(`Added **${playlist.name}** playlist (${playlist.songs.length} songs) to the queue!`, queue.textChannel.lastMessage)}`);
});

distube.on('searchInvalidAnswer', async (message) => message.channel.send((await client.language('You answered an invalid number!', message))));

distube.on('searchResult', async (message, results) => {
	const embed = new MessageEmbed()
		.setColor(message.client.config.discord.accentColor)
		.setTitle((await client.language(`Choose a song to play`, message)))
		.setFooter((await client.language("Type the specified song's position in the chat\nor wait for 30 seconds to cancel.", message)))
		.setTimestamp()
		.setDescription(`${results.map((song, i) => `**#${i + 1}** - [${song.name}](${song.url}) by [${song.uploader.name}](${song.uploader.url}) - \`[${song.formattedDuration}]\``).join('\n')}`);

	message.channel.send(embed);
});

distube.on('searchCancel', (queue) => {
	queue.textChannel.send(`${queue.client.emotes.error} - Search cancelled!`);
});

// distube.on('queueEnd', (queue) => {
// 	queue.textChannel.send(`${message.client.emotes.off} - Music stopped as there is no more songs in the queue!`);
// });

// distube.on('connectionError', (queue, error) => {
// 	queue.textChannel.send(`${message.client.emotes.error} - I'm sorry, something went wrong...\`\`\`js\n${error}\n\`\`\``);
// });

distube.on('searchNoResult', async (message, query) => {
	message.channel.send(`${message.client.emotes.error} - ${await client.language(`No results found for \`${query}\`!`, message)}`);
});

distube.on('error', (channel, error) => {
	console.error(error);
	channel.send(`${channel.client.emotes.error} - **ERROR**\`\`\`js\n${error.message.substring(0, 2000)}\n\`\`\``);
});

distube.on('initQueue', (queue) => {
	queue.autoplay = false;
	queue.volume = 100;
});

distube.on('empty', async (queue) => {
	queue.textChannel.send(`${queue.client.emotes.error} - ${await client.language('Music stopped as there is no more members in the voice channel!', queue.textChannel.lastMessage)}`);
});

// distube.on('connectionCreate', (queue, connection) => {
// 	queue.textChannel.send(`${queue.client.emotes.success} - Successfully connected to _**${connection.channel.name}**!_`);
// });

distube.on('searchDone', () => {});

// distube.on('disconnect', (queue) => {
// 	queue.textChannel.send(`${queue.client.emotes.error} - Music stopped as I have been disconnected from the channel!`);
// });

const path = require('path');

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

client.setProvider(sqlite.open({ filename: 'database.db', driver: sqlite3.Database }).then((db) => new Commando.SQLiteProvider(db))).catch(console.error);

client.once('ready', async () => {
	client.registry
		.registerDefaultTypes()
		.registerDefaultGroups()
		.registerDefaultCommands({
			unknownCommand: false,
			help: false
		})
		.registerGroups([
			['music', 'Music'],
			['fun', 'Fun'],
			['games', 'Games'],
			['eco', 'Economy'],
			['math', 'Mathematics'],
			['actions', 'Anime :)'],
			['nsfw', 'NSFW-only'],
			['level', 'Levelling'],
			['info', 'Info'],
			['hypixel', 'Hypixel Stats'],
			['moderation', 'Moderation'],
		])
		.registerCommandsIn(path.join(__dirname, 'commands'));

	// fetch(`https://api.voidbots.net/bot/stats/${client.user.id}`, {
	// 	method: "POST",
	// 	headers: { 
	// 		Authorization: "VOID_DDvXxaTzUfMrhvUlfDaYGFXxLj7MecNbag4s5nKfp0Ef2jN2",
	// 		"Content-Type": "application/json"
	// 	},
	// 	body: JSON.stringify({ "server_count": client.guilds.cache.size, "shard_count": 0 })
	// })
	// .then(response => response.text())
	// .then(console.log).catch(console.error);

	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));

	console.log(`Logged in as ${client.user.tag}. Client ID: ${client.user.id}`);
	console.log(`Ready on ${client.guilds.cache.size} guilds, for a total of ${client.users.cache.size} users`);

	setInterval(() => {
		client.user.setActivity(client.config.discord.activity.replace('{p}', client.commandPrefix).replace('{usr}', client.users.cache.size).replace('{srv}', client.guilds.cache.size), { type: client.config.discord.activityType });
	}, 120000);

	statcord.autopost();
});

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

client
	.on('debug', console.log)
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandRun', (command, promise, message) => {
		statcord.postCommand(command.name, message.author.id);
		console.log('[===== Command executed =====]');
		console.log(`Server: ${message.guild ? message.guild.name : 'DM'}`);
		console.log(`Channel: #${message.channel.type !== 'dm' ? message.channel.name : 'DM'}`);
		console.log(`Command Name: ${command.name}`);
		console.log(`Message Content: ${message.content}`);
		console.log('\n');
	})
	.on('commandError', (cmd, err) => {
		if (err instanceof Commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}\n`, err);
	})
	.on('commandBlock', (msg, reason) => {
		console.log(`Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''} blocked; ${reason}`);
	});

statcord.on("autopost-start", () => {
    // Emitted when statcord autopost starts
    console.log("Started autopost");
});

statcord.on("post", status => {
    // status = false if the post was successful
    // status = "Error message" or status = Error if there was an error
    if (!status) console.log("Successful post");
    else console.error(status);
});

const Enmap = require('enmap');
client.points = new Enmap('points');

client.on('message', async (message) => {
	if (message.author.bot) return;

	currency.add(message.author.id, 1);

	client.requestedBy = await client.language(`Requested by ${message.author.tag}`, message);

	if (message.guild && message.guild.id !== '739811956638220298') {
		const key = `${message.guild.id}-${message.author.id}`;

		client.points.ensure(`${message.guild.id}-${message.author.id}`, {
			user: message.author.id,
			guild: message.guild.id,
			points: 0,
			level: 0,
		});

		client.points.inc(key, 'points');

		const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, 'points')));

		if (client.points.get(key, 'level') < curLevel) {
			message.lineReplyNoMention((await client.language(`You've leveled up to level **${curLevel}**!`, message))).then(m => m.delete({ timeout: 5000 }));
			client.points.set(key, curLevel, 'level');
		}
	}

	if (message.guild) {
		if (!db.has(`${message.guild.id}`)) {
			db.set(`${message.guild.id}`, {});
		}

		if (!db.has(`${message.guild.id}.musicFilters`)) {
			db.set(`${message.guild.id}.musicFilters`, []);
		}

		const database = db.get(`${message.guild.id}`);

		if (message.content.includes(startDelim) && message.content.includes(endDelim)) {
			const texStrings = message.content.split(startDelim);

			if (texStrings.length !== 1) {
				texStrings.shift();

				const promises = texStrings.map((elem) => {
					const end = elem.indexOf(endDelim),
						tex = elem.slice(0, end);
					return functions.typeset(tex);
				});

				return Promise.all(promises)
					.then((images) => {
						functions.attachImages(message.channel, images, 'LaTeX:');
					})
					.catch((err) => {
						message.inlineReply(`${message.client.emotes.error} - **LaTeX Error**\n\`\`\`js\n${err}\n\`\`\``);
					});
			}
		} else {
			if (message.content == '' || message.content.includes('hmm')) return;

			let channel;

			if (db.has(`${message.guild.id}.chatbotChannel`) && db.get(`${message.guild.id}.chatbotChannel`) !== '') {
				channel = message.guild.channels.cache.get(database.chatbotChannel);

				if (channel && message.channel.type !== 'dm') {
					if (channel.id !== message.channel.id) return;

					axios
						.get(`http://api.brainshop.ai/get?bid=158578&key=lK4EO8rZt4hVX5Zb&uid=${functions.makeID(15)}&msg=${encodeURIComponent(message.content)}`)
						.then(async (response) => {
							await sleep(functions.randint(500, 2500));

							console.log(response.data);

							const { cnt } = response.data;

							message.lineReplyNoMention(cnt);
						})
						.catch((err) => {
							console.log(err);
						});
				}
			}
		}
	}

	// const data = db.get(`${message.guild.id}`);

	// let prefix = prefix1.getPrefix(message.guild.id);
	// if (!prefix) prefix = client.config.discord.prefix;

	// client.prefix = prefix;

	// if (!message.content.startsWith(prefix)) {
	// 	if (message.mentions.has(client.user)) {
	// 		const args = functions.parseQuotes(message.content.slice((client.user.toString() + ' ').length).trim());

	// 		console.log(args);

	// 		const command = args.shift().toLowerCase();

	// 		console.log(command);

	// 		const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

	// 		if (cmd) {
	// 			if (cmd.ownerOnly === true && cmd.ownerOnly !== null && message.author.id !== client.config.discord.ownerID) {
	// 				return message.channel.send(`${message.client.emotes.error} - This command is for developers only!`);
	// 			}

	// 			cmd.async run(client, message, args);
	// 		}
	// 	} else {
	//		insert commands here
	// 	}
	// } else {
	// 	const args = functions.parseQuotes(message.content.slice(prefix.length).trim());

	// 	console.log(args);

	// 	const command = args.shift().toLowerCase();

	// 	console.log(command);

	// 	const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

	// 	if (cmd) {
	// 		if (cmd.ownerOnly === true && cmd.ownerOnly !== null && message.author.id !== client.config.discord.ownerID) {
	// 			return message.channel.send(`${message.client.emotes.error} - This command is for developers only!`);
	// 		}

	// 		cmd.async run(client, message, args);
	// 	}
	// }
});

process.on('unhandledRejection', (error) => {
	console.error('Unhandled promise rejection:', error);
});

client.on('messageDelete', async (message) => {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		member: message.member,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null,
	});
});

client.on('messageUpdate', async (message) => {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		member: message.member,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null,
	});
});

client.login(client.config.discord.token);

keepAlive();
