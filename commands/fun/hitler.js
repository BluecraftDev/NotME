const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'hitler',
			group: 'fun',
			memberName: 'hitler',
			ownerOnly: false,
			guildOnly: true,
			description: 'Worse than Hitler.',
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'member',
				},
			],
		});
	}

	async run(message, { user }) {
		const image = await canvacord.Canvacord.hitler(user.user.displayAvatarURL({ format: 'png' }));
		const attachment = new Discord.MessageAttachment(image, 'hitler.png');

		const embed = new Discord.MessageEmbed()
			.setTitle(`${user.user.username} ${await client.language('is worse than Hitler!', message)}`)
			.setImage('attachment://hitler.png')
			.setColor(this.client.config.discord.accentColor)
			.setFooter((await this.client.language(`Meme created by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }))
			.attachFiles([attachment])
			.setTimestamp();

		message.channel.send(embed);
	}
};
