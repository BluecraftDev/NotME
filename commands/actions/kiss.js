const { Random } = require('something-random-on-discord');
const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'actions',
			memberName: 'kiss',
			ownerOnly: false,
			guildOnly: true,
			description: 'Kisses someone.',
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
		let data = await neko.sfw.kiss();

		console.log(data);

		if (user === message.author) {
			return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("You can't kiss yourself!", message)}`);
		}

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setImage(data.url)
			.setAuthor((await this.client.language(`${message.author.username} kisses ${user.username}! So sweet...`, message)), user.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
