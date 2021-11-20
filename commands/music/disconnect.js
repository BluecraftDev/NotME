const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'disconnect',
			aliases: ['dis', 'leave'],
			group: 'music',
			memberName: 'disconnect',
			ownerOnly: false,
			guildOnly: true,
			description: 'Disconnects from current voice channel.',
			userPermissions: ['CONNECT', 'SPEAK', 'PRIORITY_SPEAKER'],
			clientPermissions: ['CONNECT', 'SPEAK'],
		});
	}

	async run(message) {		
		if (!message.guild.me.voice.channel)
			return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("I'm not in any voice channels!", message)}`);

		const success = await message.guild.me.voice.channel.leave();

		if (success) message.channel.send(`${this.client.emotes.success} - I have been **disconnected** from this channel!`);
	}
};
