const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'give',
			aliases: ['transfer'],
			group: 'eco',
			memberName: 'give',
			guildOnly: true,
			description: 'Give your money to someone else.',
			argsType: 'multiple',
			format: '<user> <amount>'
		})
	}

	async run(message, args) {
		const currentAmount = this.client.currency.getBalance(message.author.id);
		const transferAmount = args.find(arg => !/<@!?\d+>/g.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.inlineReply((await this.client.language(`Sorry ${message.author}, that's an invalid amount.`, message)));
		if (transferAmount > currentAmount) return message.inlineReply((await this.client.language(`Sorry, you only have ${currentAmount}.`, message)));
		if (transferAmount <= 0) return message.inlineReply((await this.client.language(`Have you studied positive numbers yet?`, message)));

		this.client.currency.add(message.author.id, -transferAmount);
		this.client.currency.add(transferTarget.id, transferAmount);

		return message.inlineReply((await this.client.language(`Successfully transferred **${transferAmount}** coins to **${transferTarget.tag}**. Your current balance is **${this.client.currency.getBalance(message.author.id)}** coins.`, message)));
	}
}