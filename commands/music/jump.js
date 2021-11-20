const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'jump',
			group: 'music',
			memberName: 'jump',
			ownerOnly: false,
			guildOnly: true,
			description: 'Jump to the song position in the queue. The next one is 1, 2,... The previous one is -1, -2,...',
			userPermissions: ['CONNECT', 'SPEAK', 'PRIORITY_SPEAKER'],
			clientPermissions: ['CONNECT', 'SPEAK'],
			args: [
				{
					key: 'position',
					prompt: 'Which song position in the queue do you want to jump to?',
					type: 'integer',
				},
			],
		});
	}

	async run(message, { position }) {		
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("You're not connected in any voice channel!", message)}`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("You're not in the same voice channel!", message)}`);

		if (!queue) return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("No music is currently playing!", message)}`);

		const success = await queue.jump(position);

		if (success) message.channel.send(`${this.client.emotes.success} - Jumped to **${queue.songs[position].name}**!`);
	}
};
