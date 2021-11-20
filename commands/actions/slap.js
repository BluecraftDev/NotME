const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class SlapCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'slap',
			group: 'actions',
			memberName: 'slap',
			ownerOnly: false,
			guildOnly: true,
			description: 'Slap someone in their face.',
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
		let data = await neko.sfw.slap();

		console.log(data);

		if (user.user === message.author) {
			const embed = new MessageEmbed()
				.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
				.setImage(data.url)
				.setAuthor((await this.client.language(`${message.author.username} slaps themselves in their face! It hurts...`), message), user.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
				.setImage(data.url)
				.setAuthor((await this.client.language(`${message.author.username} slaps ${user.user.username} in their face! Ouch!`, message)), user.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		}
	}
};
