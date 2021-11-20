const Random = require('srod-v2');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'fact',
			group: 'fun',
			memberName: 'fact',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get some fact.',
		});
	}

	async run(message) {
		let data = await Random.GetFact();

		const embed = new MessageEmbed().setDescription((await this.client.language(data.embed.description, message))).setColor(data.embed.color);

		message.channel.send(embed);
	}
};
