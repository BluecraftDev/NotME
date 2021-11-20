const Memer = require('srod-v2');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'clyde',
			group: 'fun',
			memberName: 'clyde',
			ownerOnly: false,
			guildOnly: false,
			description: 'Returns fake Clyde messages.',
			args: [
				{
					key: 'text',
					prompt: 'Type something.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		var options = {
			Message: text,
			Color: this.client.config.discord.accentColor,
		};

		const data = await Memer.Clyde(options);

		const embed = new MessageEmbed()
			.setImage(data.url)
			.setDescription(`${await this.client.language('Clyde said', message)}:`)
			.setColor(this.client.config.discord.accentColor)
			.setFooter((await this.client.language(`Meme created by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		message.channel.send(embed);
	}
};
