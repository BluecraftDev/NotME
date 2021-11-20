const Memer = require('srod-v2');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'trumptweet',
			group: 'fun',
			memberName: 'trumptweet',
			ownerOnly: false,
			guildOnly: false,
			description: 'Returns fake Twitter tweet made by ex-president Donald Trump.',
			args: [
				{
					key: 'text',
					prompt: 'what text to you want Trump to say?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		var options = {
			Tweet: text,
			Color: this.client.config.discord.accentColor,
		};

		const data = await Memer.TrumpTweet(options);

		message.channel.send(data.embed);
	}
};
