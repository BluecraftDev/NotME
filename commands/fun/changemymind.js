const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class ChangeMyMind extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'changemymind',
			group: 'fun',
			memberName: 'changemymind',
			ownerOnly: false,
			guildOnly: false,
			description: 'Change my mind.',
			args: [
				{
					key: 'text',
					prompt: 'I need text.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		const image = await canvacord.Canvacord.changemymind(text || 'Life is pain');
		const attachment = new Discord.MessageAttachment(image, 'changemymind.png');

		const embed = new Discord.MessageEmbed()
			.setImage('attachment://changemymind.png')
			.setColor(this.client.config.discord.accentColor)
			.setFooter((await this.client.language(`Meme created by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }))
			.attachFiles([attachment])
			.setTimestamp();

		message.channel.send(embed);
	}
};
