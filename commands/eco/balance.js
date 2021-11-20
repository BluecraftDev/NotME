const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'balance',
			aliases: ['bal', '$'],
			group: 'eco',
			memberName: 'balance',
			guildOnly: true,
			description: 'Shows your server balance or others.',
			format: '[user]'
		})
	}

	async run(message) {
		const target = message.mentions.users.first() || message.author;

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setTitle((await this.client.language(`${target.tag}'s Balance`, message)))
			.setDescription(`\`\`\`\n${this.client.currency.getBalance(target.id)}\n\`\`\``)
			.setThumbnail(target.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
		return message.inlineReply(embed);
	}
}