const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class PatCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'pat',
			group: 'actions',
			memberName: 'pat',
			ownerOnly: false,
			guildOnly: true,
			description: 'Give someone a headpat.',
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
		let data = await neko.sfw.pat();

		console.log(data);

		if (user.user === message.author) {
			const embed = new MessageEmbed()
				.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
				.setImage(data.url)
				.setAuthor((await this.client.language(`${message.author.username} pats themselves! Hmm...`, message)), user.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
				.setImage(data.url)
				.setAuthor((await this.client.language(`${message.author.username} pats ${user.user.username}! Awww!`, message)), user.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		}
	}
};
