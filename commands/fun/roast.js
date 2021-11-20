const Memer = require('random-jokes-api');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'roast',
			group: 'fun',
			memberName: 'roast',
			ownerOnly: false,
			guildOnly: false,
			description: 'ROAST',
		});
	}

	async run(message) {
		const meme = Memer.roast();

		const embed = new MessageEmbed().setColor('RANDOM').setDescription((await this.client.language(meme, message)));

		message.channel.send(embed);
	}
};
