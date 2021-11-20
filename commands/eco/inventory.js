const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { Users } = require('../../dbObjects');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'inventory',
			aliases: ['inv'],
			group: 'eco',
			memberName: 'inventory',
			guildOnly: true,
			description: 'Shows your inventory.',
		})
	}

	async run(message) {
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		const embed = new MessageEmbed()
			.setColor(this.client.config.discord.accentColor)
			.setDescription(`\`\`\`diff\n!===== [${await this.client.language(`${target.tag}'s Inventory`, message)}] =====!\n${items.length > 0 ? items.map(i => `- ${i.item.name}: ${i.amount}`).join('\n') : (await this.client.language(`**${target.tag}** has nothing!`, message))}\`\`\``)
			.setTimestamp();
		return message.inlineReply(embed);
	}
}