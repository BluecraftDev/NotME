const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class TickleCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'tickle',
			group: 'actions',
			memberName: 'tickle',
			ownerOnly: false,
			guildOnly: true,
			description: 'Tickle someone.',
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
		let data = await neko.sfw.tickle();

		console.log(data);

		if (user.user === message.author) {
			const embed = new MessageEmbed()
				.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
				.setImage(data.url)
				.setAuthor((await this.client.language(`${message.author.username} tickles themselves! Why?`, message)), user.user.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setColor(message.author.displayHexColor === '#000000' ? '#ffffff' : message.author.displayHexColor)
				.setImage(data.url)
				.setAuthor((await this.client.language(`${message.author.username} tickles ${user.user.username}! LOL...`, message)), message.author.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		}
	}
};
