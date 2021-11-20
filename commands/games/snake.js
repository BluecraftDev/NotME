const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'snake',
			group: 'games',
			memberName: 'snake',
			ownerOnly: false,
			guildOnly: true,
			description: 'Play the snake game.',
		});
	}

	async run(message) {
		await this.client.weky.Snake({
			message: message,
			embed: {
				title: 'Snake',
				description: 'GG, you scored **{{score}}** points!',
				color: this.client.config.discord.accentColor,
				footer: 'This is just a game.',
				timestamp: true,
			},
			emojis: {
				empty: '⬛',
				snakeBody: '🟩',
				food: '🍎',
				up: '⬆️',
				right: '⬅️',
				down: '⬇️',
				left: '➡️',
			},
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			buttonText: 'Cancel',
		});
	}
};
