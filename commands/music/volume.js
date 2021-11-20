const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'volume',
			group: 'music',
			memberName: 'volume',
			ownerOnly: false,
			guildOnly: true,
			description: 'Sets volume of a queue.',
			userPermissions: ['CONNECT', 'SPEAK', 'PRIORITY_SPEAKER'],
			clientPermissions: ['CONNECT', 'SPEAK'],
			args: [
				{
					key: 'volume',
					prompt: 'What volume do you like to set?',
					type: 'integer',
					validate: (volume) => {
						if (volume <= 100 && volume >= 1) return true;
						return 'Please enter a valid number between 1 and 100!';
					},
				},
			],
		});
	}

	async run(message, { volume }) {
		const queue = this.client.player.getQueue(message.guild.id);

		if (!message.member.voice.channel) return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("You're not connected in any voice channel!", message)}`);

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("You're not in the same voice channel!", message)}`);

		if (!queue) return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("No music is currently playing!", message)}`);

		const success = queue.setVolume(volume);

		if (success) message.channel.send(`${this.client.emotes.success} - ${await this.client.language(`Volume set to **${volume}%**!`, message)}`);
	}
};
