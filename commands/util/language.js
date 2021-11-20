const Commando = require('discord.js-commando');
const ISO6391 = require('iso-639-1');
const functions = require('../../utils/functions.js');
const db = require('quick.db');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'language',
			aliases: ['lang', 'langset'],
			group: 'util',
			memberName: 'language',
			ownerOnly: false,
			guildOnly: true,
			description: 'Sets the bot\'s language for this server.',
			userPermissions: ['ADMINISTRATOR'],
			args: [
				{
					key: 'lang',
					prompt: 'Please specify a language.',
					type: 'string',
					default: 'en'
				}
			]
		});
	}

	async run(message, { lang }) {
		if (!ISO6391.getName(lang) || ISO6391.getName(lang) == '') {
			try {
				lang = ISO6391.getCode(lang);
			} catch {
				return message.channel.send(`${this.client.emotes.error} - Invalid language!`);
			}
		}

		db.set(`lang-${message.guild.id}`, lang);
		message.channel.send(`${this.client.emotes.success} - Language has been set to **${ISO6391.getName(lang) ? ISO6391.getName(lang) : functions.toTitleCase(lang)}**!`);
		// message.channel.send('Language system is currently in maintainence!');
	}
};
