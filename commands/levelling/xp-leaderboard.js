const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'xp-leaderboard',
			aliases: ['xp-lb'],
			group: 'level',
			memberName: 'xp-leaderboard',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shows the leaderboard.',
		});
	}

	async run(message) {
		const filtered = this.client.points.filter((p) => p.guild === message.guild.id).array();
		const sorted = filtered.sort((a, b) => b.points - a.points);
		const top10 = sorted.splice(0, 10);
		const embed = new MessageEmbed().setTitle((await this.client.language('Ranking Leaderboard', message))).setAuthor(`${message.guild.name}`, message.guild.iconURL()).setColor(this.client.config.discord.accentColor);
		for (const data of top10) {
			try {
				embed.addField(this.client.users.cache.get(data.user).tag, `${data.points} XP (level ${data.level})`);
			} catch {
				embed.addField(`<@${data.user}>`, `${data.points} XP (level ${data.level})`);
			}
		}
		return message.channel.send(embed);
	}
};
