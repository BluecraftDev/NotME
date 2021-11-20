const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class EightBall extends Commando.Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			group: 'fun',
			memberName: '8ball',
			ownerOnly: false,
			guildOnly: false,
			description: 'magik 8balls',
			args: [
				{
					key: 'text',
					prompt: 'What do you want to know?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		let data = await this.client.nekos.sfw['8Ball'](text);
		console.log(data);

		const embed = new MessageEmbed()
			.setAuthor((await this.client.language('Magic 8-ball', message)), this.client.user.displayAvatarURL())
			.setTitle(text)
			.setColor(this.client.config.discord.accentColor)
			.setDescription(await this.client.language(data.response, message))
			.setImage(data.url)
			.setFooter((await this.client.language(`Asked by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		message.channel.send(embed);
	}
};
