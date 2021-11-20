const Random = require('srod-v2');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class AdviceCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'advice',
			group: 'fun',
			memberName: 'advice',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get a random advice.',
		});
	}

	async run(message) {
		let data = await Random.GetAdvice();

		const embed = new MessageEmbed().setDescription((await this.client.language(data.embed.description, message))).setColor(data.embed.color);

		message.channel.send(embed);
	}
};
