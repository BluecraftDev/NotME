const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'fast-click',
			group: 'games',
			memberName: 'fast-click',
			ownerOnly: false,
			guildOnly: true,
			description: 'autoclicekr',
		});
	}

	async run(message) {
		await this.client.weky.QuickClick({
			message: message,
			embed: {
				title: (await this.client.language('Quick Click', message)),
				color: this.client.config.discord.accentColor,
				footer: 'This is just a game.',
				timestamp: true,
			},
			time: 60000,
			waitMessage: (await this.client.language('The buttons may appear anytime now!', message)),
			startMessage: (await this.client.language('First person to press the correct button will win. You have **{{time}}**!', message)),
			winMessage: (await this.client.language('<@{{winner}}> pressed the button in **{{time}}**.', message)),
			loseMessage: this.client.language('No one pressed the button in time. So, I dropped the game!', message),
			emoji: '👆',
			ongoingMessage: 'A game is already runnning in <#{{channel}}>. You can\'t start a new one!',
		});
	}
};
