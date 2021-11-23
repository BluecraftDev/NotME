const fetch = require('node-fetch');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const Pagination = require('discord-paginationembed');
const moment = require('moment');

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

		for (let i = 1; i <= 10; ++i) {
			const embed1 = new Discord.MessageEmbed()
				.setTitle(response.results[i].package.name)

			for (const [key, value] of Object.entries(response.results[i].package)) {
				if (typeof value == 'object' && isNaN(Object.keys(value))) {
					const keys = [];
					for (const [key1, value1] of Object.entries(value)) {
						if (value1.toString().startsWith('http')) {
							keys.push(`[${this.client.functions.toTitleCase(key1).replace('Npm', 'NPM')}](${value1})`);
						} else {
							if (typeof value1 == 'object' && isNaN(Object.keys(value1))) {
								for (const [key2, value2] of Object.entries(value1)) {
									keys.push(`${value2}`);
								}
							} else {
								keys.push(`${value1}`);
							}
						}
					}
					embed1.addField(this.client.functions.toTitleCase(key), keys.join('\n'), false);
				} else {
					if (isIsoDate(value)) {
						embed1.addField(this.client.functions.toTitleCase(key), `<t:${moment(value).unix()}> (<t:${moment(value).unix()}:R>)`, false);
					} else {
						embed1.addField(this.client.functions.toTitleCase(key), value, true);
					}
				}
			}

			embeds.push(embed1);
		}

		const embed = new Pagination.Embeds()
			.setArray(embeds)
			.setAuthorizedUsers([message.author.id])
			.setChannel(message.channel)
			.setPageIndicator(true)
			.setPage(1)
			.setColor(this.client.config.discord.accentColor)
			.setFooter(this.client.requestedBy, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail('https://authy.com/wp-content/uploads/npm-logo.png')
			.build();

		message.inlineReply(embed);
	}
};
