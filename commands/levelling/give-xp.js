const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'give-xp',
			aliases: ['xp-give'],
			group: 'level',
			memberName: 'give-xp',
			ownerOnly: false,
			guildOnly: true,
			description: 'Gives some XP to other members.',
			userPermissions: ['MANAGE_GUILD'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'member',
				},
				{
					key: 'points',
					prompt: 'How many XP do you want to give this member?',
					type: 'integer',
				},
			],
		});
	}

	async run(message, { user, points }) {
		const pointsToAdd = parseInt(points, 10);
		if (!pointsToAdd) return message.inlineReply((await this.client.language("You didn't tell me how many points to give...", message)));

		this.client.points.ensure(`${message.guild.id}-${user.user.id}`, {
			user: message.author.id,
			guild: message.guild.id,
			points: 0,
			level: 1,
		});

		let userPoints = this.client.points.get(`${message.guild.id}-${user.user.id}`, 'points');

		userPoints += pointsToAdd;

		this.client.points.set(`${message.guild.id}-${user.user.id}`, userPoints, 'points');
		message.channel.send((await this.client.language(`**${user.user.tag}** has received **${pointsToAdd}** XP and now stands at **${userPoints}** XP.`, message)));
	}
};
