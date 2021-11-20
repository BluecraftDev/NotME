const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { CurrencyShop } = require('../../dbObjects');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'shop',
			aliases: [],
			group: 'eco',
			memberName: 'shop',
			guildOnly: true,
			description: 'Displays the shop.',
		})
	}

	async run(message) {
		const items = await CurrencyShop.findAll();

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setTitle(`${this.client.user.username}'s Shop`)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setTimestamp();

		items.forEach((item) => {
			embed.addField(item.name, `${item.cost} coins`, true);
		});
		
		return message.inlineReply(embed);
	}
}