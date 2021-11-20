const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'seek',
			group: 'music',
			memberName: 'seek',
			ownerOnly: false,
			guildOnly: true,
			description: 'Set the playing time to another position (in seconds).',
			userPermissions: ['CONNECT', 'SPEAK', 'PRIORITY_SPEAKER'],
			clientPermissions: ['CONNECT', 'SPEAK'],
			args: [
				{
					key: 'position',
					prompt: 'Which seconds of the song do you want to seek to (in seconds)?',
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

		const success = await queue.seek(position);

		if (success) message.channel.send(`${this.client.emotes.success} - Seeked to **${queue.formattedCurrentTime}**!`);
	}
};
