const googleIt = require('google-it');
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'google',
			aliases: ['gg'],
			group: 'info',
			memberName: 'google',
			ownerOnly: false,
			guildOnly: false,
			description: 'Google it.',
			args: [
				{
					key: 'query',
					prompt: "What do you want to search?",
					type: 'string',
				},
			],
		});
	}

	async run(message, { query }) {
		const embed = new MessageEmbed().setTitle((await this.client.language('Google Search Results', message))).setColor(this.client.config.discord.accentColor).setTimestamp();

		googleIt({ query: query })
			.then((results) => {
				results.forEach(function (item, index) {
					embed.addField(index + 1 + ': ' + item.title, '<' + item.link + '>');
				});

				message.inlineReply(embed);
			})
			.catch((e) => {
				message.inlineReply(`\`\`\`js\n${e}\n\`\`\``);
			});
	}
};
