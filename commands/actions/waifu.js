const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'waifu',
			group: 'actions',
			memberName: 'waifu',
			ownerOnly: false,
			guildOnly: true,
			description: 'Get a random waifu image.',
		});
	}

	async run(message) {
		let data = await this.client.nekos.sfw.waifu();

		console.log(data);

		const embed = new MessageEmbed()
			.setColor(message.author.displayHexColor === '#000000' ? '#ffffff' : message.author.displayHexColor)
			.setImage(data.url)
			.setAuthor((await this.client.language('Your waifu is here!', message)), message.author.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
