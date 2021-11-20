const humanize = require('humanize-duration');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'uptime',
			group: 'util',
			memberName: 'uptime',
			ownerOnly: false,
			guildOnly: false,
			description: "Shows the bot's uptime.",
		});
	}

	async run(message) {
		const uptime = await this.client.language('Bot uptime', message);
		const embed = new MessageEmbed().setColor(this.client.config.discord.accentColor).setAuthor(uptime, this.client.user.displayAvatarURL()).setTitle(await this.client.language(humanize(this.client.uptime), message));

		message.channel.send(embed);
	}
};
