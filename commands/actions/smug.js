const { MessageEmbed } = require('discord.js');
const neko_client = require('nekos.life');
const neko = new neko_client();
const Commando = require('discord.js-commando');

module.exports = class SmugCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'smug',
			group: 'actions',
			memberName: 'smug',
			ownerOnly: false,
			guildOnly: true,
			description: 'smug',
		});
	}

	async run(message) {
		let data = await neko.sfw.smug();

		console.log(data);

		const embed = new MessageEmbed()
			.setColor(message.member.displayHexColor === '#000000' ? '#ffffff' : message.member.displayHexColor)
			.setImage(data.url)
			.setAuthor((await this.client.language(`${message.author.username} is smugging!`, message)), message.author.displayAvatarURL({ dynamic: true }));

		message.channel.send(embed);
	}
};
