const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Amogus extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'betrayal',
			aliases: ['amogusripoff'],
			group: 'games',
			memberName: 'betrayal',
			ownerOnly: false,
			guildOnly: true,
			description: 'tf is this',
			format: '[voiceChannel]'
		});
	}

	async run(message) {
		var channel = message.mentions.channels.first();
		const voiceNotFound = await this.client.language("You're not connected in any voice channel!", message);
		const invalidVoice = await this.client.language('Invalid voice channel!', message);

		if (!channel) {
			channel = message.member.voice.channel;

			if (!channel) return message.channel.send(`${this.client.emotes.error} - ${voiceNotFound}`);
		}

		if (channel.type !== 'voice') {
			return message.channel.send(`${this.client.emotes.error} - ${invalidVoice}`);
		}

		this.client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async (invite) => {
			const embed = new Discord.MessageEmbed().setAuthor('Betrayal.io').setColor(this.client.config.discord.accentColor).setTimestamp().setTitle((await this.client.language('Click here to join', message))).setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
