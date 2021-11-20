const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'cleanup',
			aliases: ['clean'],
			group: 'level',
			memberName: 'cleanup',
			ownerOnly: false,
			guildOnly: true,
			description: 'Cleans old users.',
			userPermissions: ['MANAGE_GUILD'],
		});
	}

	async run(message) {
		const filtered = this.client.points.filter((p) => p.guild === message.guild.id);

		const rightNow = new Date();

		const toRemove = filtered.filter((data) => {
			return !message.guild.members.cache.has(data.user) || rightNow - 2592000000 > data.lastSeen;
		});

		toRemove.forEach((data) => {
			this.client.points.delete(`${message.guild.id}-${data.user}`);
		});

		message.channel.send(`${await this.client.language(`I've cleaned up ${toRemove.size} old farts.`. message)}`);
	}
};
