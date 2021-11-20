const Commando = require('discord.js-commando');
const { Users, CurrencyShop } = require('../../dbObjects');
const { Op } = require('sequelize');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'buy',
			aliases: [],
			group: 'eco',
			memberName: 'buy',
			guildOnly: true,
			description: 'Buy things in the shop.',
			argsType: 'multiple',
			format: '<item>'
		})
	}

	async run(message, args) {
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: args } } });
		if (!item) return message.inlineReply((await this.client.language(`That item doesn't exist.`, message)));
		if (item.cost > this.client.currency.getBalance(message.author.id)) {
			return message.inlineReply((await this.client.language('You don\'t have enough money!', message)));
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		this.client.currency.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.inlineReply((await this.client.language(`You've bought **${item.name}**!`, message)));
	}
}