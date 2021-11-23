const fetch = require('node-fetch');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const Pagination = require('discord-paginationembed');

function isIsoDate(str) {
	if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
	var d = new Date(str);
	return d.toISOString() === str;
}

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'npmjs',
			aliases: ['npm'],
			group: 'info',
			memberName: 'npmjs',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get a npm package\'s information.',
			args: [
				{
					key: 'npm_package',
					prompt: 'What package do you like to search?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { npm_package }) {
		let data = await fetch(`https://api.npms.io/v2/search?q=${npm_package.split(" ").join("+")}`);
		let response = await data.json();

		const embeds = [];

		for (let i = 1; i <= 5; ++i) {
			const embed1 = new Discord.MessageEmbed()
				.setTitle(response.results[i].package.name)

			for (const [key, value] of Object.entries(response.results[i].package)) {
				if (typeof value == 'object' && key !== 'keywords') {
					const keys = [];
					for (const [key1, value1] of Object.entries(value)) {
						keys.push(`${this.client.functions.toTitleCase(key1)}: ${value1}`);
					}
					embed1.addField(this.client.functions.toTitleCase(key), keys.join('\n'), true);
				} else {
					if (isIsoDate(value)) {
						embed1.addField(this.client.functions.toTitleCase(key), new Date(value), true);
					}
					embed1.addField(this.client.functions.toTitleCase(key), value, true);
				}
			}

			embeds.push(embed1);
		}

		const embed = new Pagination.Embeds()
			.setArray(embeds)
			.setAuthorizedUsers([message.author.id])
			.setChannel(message.channel)
			.setPageIndicator(true)
			.setPage(3)
			.setColor(this.client.config.discord.accentColor)
			.setThumbnail('https://authy.com/wp-content/uploads/npm-logo.png')
			.build();

		message.inlineReply(embed);
	}
};
