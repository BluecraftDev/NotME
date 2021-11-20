const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const neko_client = require('nekos.life');
const neko = new neko_client();

module.exports = class BakaCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'baka',
			group: 'actions',
			memberName: 'baka',
			ownerOnly: false,
			guildOnly: true,
			description: 'Baka bakaa~',
		});
	}

	async run(message) {
		let data = await neko.sfw.baka();

		console.log(data);

		const embed = new MessageEmbed()
			.setColor(message.member.displayHexColor === '#000000' ? '#ffffff' : message.member.displayHexColor)
			.setImage(data.url)
			.setAuthor(`Baka x3.14 :P`, message.author.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
