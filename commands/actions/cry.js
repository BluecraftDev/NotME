const { Random } = require('something-random-on-discord');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class CryCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'cry',
			group: 'actions',
			memberName: 'cry',
			ownerOnly: false,
			guildOnly: true,
			description: 'just cry',
		});
	}

	async run(message) {
		let data = await Random.getAnimeImgURL('cry');

		console.log(data);

		const embed = new MessageEmbed()
			.setColor(message.member.displayHexColor === '#000000' ? '#ffffff' : message.member.displayHexColor)
			.setImage(data)
			.setAuthor((await this.client.language(`${message.author.username} is crying!`, message)), message.author.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
