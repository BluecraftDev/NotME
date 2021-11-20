const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'would-you-rather',
			aliases: ['wyr'],
			group: 'games',
			memberName: 'would-you-rather',
			ownerOnly: false,
			guildOnly: true,
			description: 'Would you rather...',
		});
	}

	async run(message) {
		await this.client.weky.WouldYouRather({
			message: message,
			embed: {
				title: (await this.client.language('Would you rather...', message)),
				color: this.client.config.discord.accentColor,
				footer: 'reeeee',
				timestamp: true,
			},
			thinkMessage: (await this.client.language("I'm thinking", message)),
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			buttons: { optionA: (await this.client.language('Option A', message)), optionB: (await this.client.language('Option B', message)) },
		});
	}
};
