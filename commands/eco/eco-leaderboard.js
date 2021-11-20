const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'eco-leaderboard',
			aliases: ['eco-lb'],
			group: 'eco',
			memberName: 'eco-leaderboard',
			guildOnly: true,
			description: 'Displays the economy leaderboard.',
		})
	}

	async run(message) {
		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setDescription(
				`\`\`\`diff\n!=========== [${await this.client.language(`Economy Leaderboard`, message)}] ===========!\n` + this.client.currency.sort((a, b) => b.balance - a.balance)
				.filter(user => this.client.users.cache.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(this.client.users.cache.get(user.user_id).tag)}: ${user.balance} coins`)
				.join('\n') + '\n```'
			)
			.setTimestamp();
		
		return message.channel.send(embed);
	}
}