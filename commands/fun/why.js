const Random = require('srod-v2');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'why',
			group: 'fun',
			memberName: 'why',
			ownerOnly: false,
			guildOnly: false,
			description: 'Why?',
		});
	}

	async run(message) {
		let data = await Random.GetWhy({
			Color: 'RANDOM',
		});

		const embed = new MessageEmbed().setDescription((await this.client.language(data.embed.description, message))).setColor(data.embed.color);

		message.channel.send(embed);
	}
};
