const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'coins-leaderboard',
			aliases: ['coins-lb'],
			group: 'eco',
			memberName: 'coins-leaderboard',
			guildOnly: true,
			description: 'Shows a leaderboard about coins.',
		})
	}

	async run(message) {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.cache.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true },
		);
	}
}