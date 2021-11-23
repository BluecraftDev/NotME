const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'flip',
			group: 'util',
			memberName: 'flip',
			ownerOnly: false,
			guildOnly: false,
			description: 'Flips a given string.',
			args: [
				{
					key: 'text',
					prompt: 'What word do you want to flip?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		message.inlineReply(this.client.functions.flipText(text));
	}
};
