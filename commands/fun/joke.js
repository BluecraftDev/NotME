const Random = require('srod-v2');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'joke',
			group: 'fun',
			memberName: 'joke',
			ownerOnly: false,
			guildOnly: false,
			description: 'Jokes.',
		});
	}

	async run(message) {
		let data = await Random.GetJoke();

		const embed = new MessageEmbed().setTitle((await this.client.language(data.embed.title, message))).setDescription(await this.client.language(data.embed.description, message)).setColor(data.embed.color);

		message.channel.send(embed);
	}
};
