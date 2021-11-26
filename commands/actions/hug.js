const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class HugCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'hug',
			group: 'actions',
			memberName: 'hug',
			ownerOnly: false,
			guildOnly: true,
			description: 'Hugs someone.',
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'user',
				},
			],
		});
	}

	async run(message, { user }) {
		let data = await neko.sfw.hug();

		if (user === message.author) {
			return message.inlineReply(`${this.client.emotes.error} - ${await this.client.language("You can't hug yourself!", message)}`);
		}

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setImage(data.url)
			.setAuthor((await this.client.language(`${message.author.username} hugs ${user.username}! Yay...`, message)), user.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
