const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'autoplay',
			aliases: ['ap'],
			group: 'music',
			memberName: 'autoplay',
			ownerOnly: false,
			guildOnly: true,
			description: 'Toggle autoplay mode.',
			userPermissions: ['CONNECT', 'SPEAK', 'PRIORITY_SPEAKER'],
			clientPermissions: ['CONNECT', 'SPEAK'],
		});
	}

	async run(message) {		
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("You're not connected in any voice channel!", message)}`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("You're not in the same voice channel!", message)}`);

		if (!queue) return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("No music is currently playing!", message)}`);

		const success = await queue.toggleAutoplay();

		if (success === true) message.channel.send(`${this.client.emotes.success} - ${await this.client.language("Auto-play has been **enabled**!", message)}`);
		else if (success === false) message.channel.send(`${this.client.emotes.success} - ${await this.client.language("Auto-play has been **disabled**!", message)}`);
	}
};
