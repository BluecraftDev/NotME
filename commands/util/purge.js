const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			aliases: ['clear'],
			group: 'util',
			memberName: 'purge',
			ownerOnly: false,
			guildOnly: true,
			description: 'Delete messages.',
			argsType: 'single',
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			format: '[messages_count]'
		});
	}

	async run(message, args) {
		if (!args[0] || args[0].match(/all/gi)) {
			message.channel.messages.fetch().then((messages) => {
				try {
					const succ = message.channel.bulkDelete(messages);
					if (succ) return message.channel.send(`${this.client.emotes.success} - Successfully purged all messages!`).then((m) => m.delete(6000));
				} catch (err) {
					return message.channel.send(`${this.client.emotes.error} - **ERROR**\`\`\`js\n${err}\n\`\`\``);
				}
			});
		} else {
			let messageCount = parseInt(args[0]);
			message.channel.messages.fetch({ limit: messageCount }).then((messages) => {
				try {
					const succ = message.channel.bulkDelete(messages);
					if (succ) return message.channel.send(`${this.client.emotes.success} - Successfully purged **${args[0]}** messages!`).then((m) => m.delete(6000));
				} catch (err) {
					return message.channel.send(`${this.client.emotes.error} - **ERROR**\`\`\`js\n${err}\n\`\`\``);
				}
			});
		}
	}
};
