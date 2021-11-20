const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'fishington',
			group: 'games',
			memberName: 'fishington',
			ownerOnly: false,
			guildOnly: true,
			description: 'fishy fishy',
			format: '[voiceChannel]'
		});
	}

	async run(message) {
		var channel = message.mentions.channels.first();

		if (!channel) {
			channel = message.member.voice.channel;

			if (!channel) return message.channel.send(`${this.client.emotes.error} - ${await this.client.language("You're not connected in any voice channel!", message)}`);
		}

		if (channel.type !== 'voice') {
			return message.channel.send(`${this.client.emotes.error} - ${await this.client.language('Invalid voice channel!', message)}`);
		}

		this.client.discordTogether.createTogetherCode(channel.id, 'fishing').then(async (invite) => {
			const embed = new Discord.MessageEmbed().setAuthor('Fishington.io').setColor(this.client.config.discord.accentColor).setTimestamp().setTitle((await this.client.language('Click here to join', message))).setURL(invite.code);

			return message.channel.send(embed);
		});
	}
};
