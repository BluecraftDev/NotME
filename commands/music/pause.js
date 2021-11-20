const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			group: 'music',
			memberName: 'pause',
			ownerOnly: false,
			guildOnly: true,
			description: 'Pauses the queue.',
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

		const success = await queue.pause();

		if (success) message.channel.send(`${this.client.emotes.success} - Song **${queue.songs[0].name}** paused!`);
	}
};
