const Commando = require('discord.js-commando');
const { generateTranscript } = require('reconlx');
const { MessageAttachment } = require('discord.js');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'transcript',
			group: 'util',
			memberName: 'transcript',
			ownerOnly: false,
			guildOnly: true,
			hidden: true,
			description: 'Generates a discord-like transcript.',
		});
	}

	async run(message) {
		const data = await this.client.functions.generateTranscript(message.channel, message.guild, await message.channel.messages.fetch({ limit: 100 }));

		const file = new MessageAttachment(data, 'index.html');
		message.channel.send(file);
	}
};
