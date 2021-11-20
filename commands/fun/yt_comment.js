const canvacord = require('canvacord');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'youtube-cmt',
			aliases: ['yt-cmt'],
			group: 'fun',
			memberName: 'youtube-cmt',
			ownerOnly: false,
			guildOnly: true,
			description: 'fake youtube comments',
			argsType: 'multiple',
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'member',
				},
				{
					key: 'text',
					prompt: 'Input the text.',
					type: 'string',
				},
			],
		});
	}

	async run(message, { user, text }) {
		var options = {
			username: user.user.username,
			avatar: user.user.displayAvatarURL({ format: 'png', dynamic: false }).toString(),
			content: text,
			dark: false,
		};

		const data = await canvacord.Canvacord.youtube(options);

		const attachment = new MessageAttachment(data, 'youtube.png');

		const embed = new MessageEmbed().setImage('attachment://youtube.png').setColor(this.client.config.discord.accentColor).attachFiles([attachment]).setTimestamp();

		message.channel.send(embed);
	}
};
