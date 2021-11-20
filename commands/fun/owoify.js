const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'owoify',
			group: 'fun',
			memberName: 'owoify',
			ownerOnly: false,
			guildOnly: false,
			description: 'OwOify a given string.',
			args: [
				{
					key: 'text',
					prompt: 'Type something to OwOify it.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		let data = await this.client.nekos.sfw.OwOify({ text: text });

		message.channel.send(data.owo);
	}
};
