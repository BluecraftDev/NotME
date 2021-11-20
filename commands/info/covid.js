const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'covid-19',
			aliases: ['covid', 'corona'],
			group: 'info',
			memberName: 'covid-19',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get statistics about COVID-19',
			args: [
				{
					key: 'country',
					prompt: 'What country?',
					type: 'string',
					default: 'overall'
				},
			],
		});
	}
	async run(message, { country }) {
		let embed = new MessageEmbed();

		if (country.match(/all|global|globe|world|overall/gi)) {
			let jsonData = await fetch('https://disease.sh/v3/covid-19/all');
			jsonData = await jsonData.json();
			embed
				.setTitle(await this.client.language('Global Cases', message))
				.setColor(this.client.config.discord.accentColor)
				.setDescription((await this.client.language('Sometimes cases number may differ from small amount.', message)))
				.addField((await this.client.language('Total Cases', message)), jsonData.cases.toLocaleString(), true)
				.addField((await this.client.language('Total Deaths', message)), jsonData.deaths.toLocaleString(), true)
				.addField((await this.client.language('Total Recovered', message)), jsonData.recovered.toLocaleString(), true)
				.addField((await this.client.language("Today's Cases", message)), jsonData.todayCases.toLocaleString(), true)
				.addField((await this.client.language("Today's Deaths", message)), jsonData.todayDeaths.toLocaleString(), true)
				.addField((await this.client.language('Active Cases', message)), jsonData.active.toLocaleString(), true);
		} else {
			let jsonData = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
			jsonData = await jsonData.json();

			if (!jsonData.country) return message.inlineReply("I'm unable to get the **" + country + "**'s details.");

			embed
				.setTitle(`${jsonData.country.toUpperCase()}`)
				.setColor(this.client.config.discord.accentColor)
				.setDescription((await this.client.language('Sometimes cases number may differ from small amount.', message)))
				.setThumbnail(jsonData.countryInfo.flag || '')
				.addField((await this.client.language('Total Cases', message)), jsonData.cases.toLocaleString(), true)
				.addField((await this.client.language('Total Deaths', message)), jsonData.deaths.toLocaleString(), true)
				.addField((await this.client.language('Total Recovered', message)), jsonData.recovered.toLocaleString(), true)
				.addField((await this.client.language("Today's Cases", message)), jsonData.todayCases.toLocaleString(), true)
				.addField((await this.client.language("Today's Deaths", message)), jsonData.todayDeaths.toLocaleString(), true)
				.addField((await this.client.language('Active Cases', message)), jsonData.active.toLocaleString(), true);
		}
		return message.inlineReply(embed).catch(async () => {
			return message.inlineReply((await this.client.language('Something went wrong, please try again later.', message)));
		});
	}
};
