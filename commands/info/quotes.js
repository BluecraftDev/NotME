const fetch = require('node-fetch');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'quotes',
			aliases: ['quote'],
			group: 'info',
			memberName: 'quotes',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get random quotes.',
		});
	}

	async run(message) {
		let data = await fetch('https://zenquotes.io/api/random');
		let response = await data.json();

		const embed = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor(this.client.config.discord.accentColor)
			.setDescription((await this.client.language(`"${response[0]['q']}"`, message)))
			.setFooter((await this.client.language(`A random quote by "${response[0]['a']}"`, message)));

		message.channel.send(embed);
	}
};
