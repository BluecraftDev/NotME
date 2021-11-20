const { join } = require('bluebird');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'mfilters',
			group: 'music',
			memberName: 'mfilters',
			ownerOnly: false,
			guildOnly: true,
			description: 'Shows available filters.',
		});
	}

	async run(message) {
		let disabledFilters = [];

		for (const filter of Object.keys(this.client.player.filters)) {
			disabledFilters.push(filter);
		}
		
		if (!disabledFilters) disabledFilters = 'None';

		console.log(disabledFilters);

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setTimestamp()
			.setTitle((await this.client.language('Available Music Filters', message)))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setDescription(disabledFilters.map(x => `\`${x}\``).join(', '))
			.setFooter((await this.client.language(`Requested by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }))

		message.channel.send(embed);
	}
};
