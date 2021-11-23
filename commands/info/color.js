const fetch = require('node-fetch');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'color',
			aliases: ['hex'],
			group: 'info',
			memberName: 'color',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get a color information by hex.',
			args: [
				{
					key: 'hex',
					prompt: 'What color do you like to search?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { hex }) {
		let data = await fetch(`http://www.thecolorapi.com/id?format=json&hex=${hex}`);
		let response = await data.json();

		const embed = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor(this.client.config.discord.accentColor)
			.setTitle(response.name.value)
			.setThumbnail(response.image.bare)
			.addFields(
				{ name: 'Hex Value', value: response.hex.value, inline: true },
				{ name: 'RGB Value', value: response.rgb.value, inline: true },
				{ name: 'HSL Value', value: response.hsl.value, inline: true }
			)

		message.inlineReply(embed);
	}
};
