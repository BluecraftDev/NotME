const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class SnipeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'snipe',
			group: 'util',
			memberName: 'snipe',
			ownerOnly: false,
			guildOnly: true,
			description: 'Sees the most recent deleted or edited message.',
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}

	async run(message) {
		const msg = this.client.snipes.get(message.channel.id);

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setAuthor(msg.author, msg.member.user.displayAvatarURL())
			.setDescription(msg.content)
			.setFooter('Get sniped lol')
			.setTimestamp();

		return message.channel.send(embed);
	}
};
