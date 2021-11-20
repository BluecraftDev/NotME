const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			aliases: ['av'],
			group: 'util',
			memberName: 'avatar',
			ownerOnly: false,
			guildOnly: true,
			description: "Shows a user's avatar with a specified size (Default is 4096).",
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to use with this command?',
					type: 'user',
				},
				{
					key: 'size',
					prompt: 'Which size?',
					type: 'integer',
					default: 4096,
				},
			],
		});
	}

	async run(message, { user, size }) {
		/*
        const embed = new MessageEmbed()
            .setTitle(user.nickname)
            .setImage(user.user.displayAvatarURL({
                dynamic: true,
                format: format,
                size: size
            }))
            .setDescription('Actual image may larger or smaller than this image.')
            .setTimestamp()
            .setFooter(`Image Format: ${format.toUpperCase()}, Image Size: ${size}`);
        */

		const embed = new MessageEmbed()
			.setTitle((await this.client.language(`${user.username}'s Avatar`, message)))
			.setColor(this.client.config.discord.accentColor)
			.setDescription(`${await this.client.language('Image Size:', message)} ${size}\nURL: [${await this.client.language('Click here', message)}](${user.avatarURL({ dynamic: true, size: size })})`)
			.setImage(
				user.avatarURL({
					dynamic: true,
					size: size,
				})
			)
			.setFooter((await this.client.language(`Requested by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		return message.channel.send(embed);
	}
};
