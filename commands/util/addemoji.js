const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'addemoji',
			aliases: ['addemote'],
			group: 'util',
			memberName: 'addemoji',
			ownerOnly: false,
			guildOnly: true,
			description: 'Add a custom emoji.',
			userPermissions: ['MANAGE_EMOJIS'],
			clientPermissions: ['MANAGE_EMOJIS'],
			args: [
				{
					key: 'emojiname',
					prompt: 'Which name would you like to set for this new emoji?',
					type: 'string',
				},
				{
					key: 'url',
					prompt: 'Please provide the imageURL for this new emoji.',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, { emojiname, url }) {
		if (message.attachments.first() && url) {
			message.guild.emojis
				.create(url, emojiname)
				.then(async (emoji) => message.channel.send(`${this.client.emotes.success} - ${await this.client.language(`You successfully created an emoji named **${emoji.name}**!`, message)}`))
				.catch(async (emoji) => message.channel.send(`${this.client.emotes.error} - ${await this.client.language('Something went wrong trying to create an emoji!', message)} \`\`\`js\n${emoji}\n\`\`\``));
		} else if (message.attachments.first()) {
			console.log(message.attachments.first().url);

			message.guild.emojis
				.create(message.attachments.first().url, emojiname)
				.then(async (emoji) => message.channel.send(`${this.client.emotes.success} - ${await this.client.language(`You successfully created an emoji named **${emoji.name}**!`, message)}`))
				.catch(async (emoji) => message.channel.send(`${this.client.emotes.error} - ${await this.client.language('Something went wrong trying to create an emoji!', message)} \`\`\`js\n${emoji}\n\`\`\``));
		} else if (url) {
			message.guild.emojis
				.create(url, emojiname)
				.then(async (emoji) => message.channel.send(`${this.client.emotes.success} - ${await this.client.language(`You successfully created an emoji named **${emoji.name}**!`, message)}`))
				.catch(async (emoji) => message.channel.send(`${this.client.emotes.error} - ${await this.client.language('Something went wrong trying to create an emoji!', message)} \`\`\`js\n${emoji}\n\`\`\``));
		}
	}
};
