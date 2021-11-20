const canvacord = require('canvacord');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'spotify',
			group: 'info',
			memberName: 'spotify',
			ownerOnly: false,
			guildOnly: true,
			description: 'Spotify presence.',
			argsType: 'single',
			format: '[user]'
		});
	}
	async run(message, args) {
		let user;

		if (!args[0]) {
			user = message.member;
		} else {
			user =
				message.mentions.members.first() ||
				(await message.guild.members.fetch(args[0]).catch((err) => {
					return message.channel.send(`${this.client.emotes.error} - Unable to find this user!`);
				}));
		}

		if (!user) {
			return message.channel.send(`${this.client.emotes.error} - Unable to find this user!`);
		}

		user.presence.activities.forEach((activity) => {
			if (!activity || activity.name !== 'Spotify') return;

			const card = new canvacord.Spotify()
				.setAuthor(activity.state.replace(/;/g, ','))
				.setAlbum(activity.assets.largeText)
				.setStartTimestamp(activity.timestamps.start)
				.setEndTimestamp(activity.timestamps.end)
				.setImage(activity.assets.largeImageURL())
				.setTitle(activity.details);

			card.build().then((buffer) => {
				const attachment = new Discord.MessageAttachment(buffer, 'spotify.png');

				return message.inlineReply({ files: [attachment] });
			});
		});
	}
};
