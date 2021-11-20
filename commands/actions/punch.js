const { Random } = require('something-random-on-discord');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class PunchCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'punch',
			group: 'actions',
			memberName: 'punch',
			ownerOnly: false,
			guildOnly: true,
			description: 'Punch someone.',
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
		let data = await Random.getAnimeImgURL('punch');

		console.log(data);

		if (user.user === message.author) {
			const embed = new MessageEmbed()
				.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
				.setImage(data)
				.setAuthor((await this.client.language(`${message.author.username} punches themselves! It hurts...`, message)), user.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
				.setImage(data)
				.setAuthor((await this.client.language(`${message.author.username} punches ${user.user.username}! Pain...`, message)), user.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		}
	}
};
