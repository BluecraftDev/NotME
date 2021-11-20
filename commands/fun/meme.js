const Memer = require('random-jokes-api');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'memes',
			aliases: ['meme'],
			group: 'fun',
			memberName: 'memes',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get a random meme from subreddits.',
		});
	}

	async run(message) {
		const meme = Memer.meme();

		const embed = new MessageEmbed().setColor('RANDOM').setTitle(meme.title).setImage(meme.url).setFooter(`${await this.client.language(`A random post from r/${meme.category}`, message)}`).setTimestamp();

		return message.channel.send(embed);
	}
};
