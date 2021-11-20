const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'latex',
			aliases: ['tex'],
			group: 'math',
			memberName: 'latex',
			ownerOnly: false,
			guildOnly: false,
			description: 'Renders LaTeX.',
			args: [
				{
					key: 'anything',
					prompt: 'Input LaTeX please.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { anything }) {
		const tex = anything;

		functions
			.typeset(tex)
			.then((image) => {
				functions.attachImage(message.channel, image, 'Result:');
			})
			.catch((err) => {
				message.channel.send(`${this.client.emotes.error} - **LaTeX Error**\n\`\`\`js\n${err}\n\`\`\``);
			});
	}
};
