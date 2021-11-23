const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'rip',
			group: 'fun',
			memberName: 'rip',
			ownerOnly: false,
			guildOnly: true,
			description: 'F in the chat',
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'member',
					default: ''
				},
			],
		});
	}

	async run(message, { user }) {
		if (!user) {
			user = message.member;
		}
		
		const image = await canvacord.Canvacord.rip(user.user.displayAvatarURL({ format: 'png' }));
		const attachment = new Discord.MessageAttachment(image, 'rip.png');

		const embed = new Discord.MessageEmbed()
			.setTitle('F in the chat')
			.setImage('attachment://rip.png')
			.setColor(this.client.config.discord.accentColor)
			.setFooter((await this.client.language(`Meme created by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }))
			.attachFiles([attachment])
			.setTimestamp();

		message.channel.send(embed);
	}
};
