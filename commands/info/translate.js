const translate = require('@iamtraction/google-translate');
const { MessageEmbed } = require('discord.js');
const ISO6391 = require('iso-639-1');

const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'translate',

			group: 'info',
			memberName: 'translate',
			ownerOnly: false,
			guildOnly: false,
			description: 'Translates a string to a language (Default is English).',
			examples: ['translate hello -ja'],
			args: [
				{
					key: 'text',
					prompt: "Type anything you want to translate.",
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		let lang;

		const query = text.split(' -');

		console.log(query);

		if (!query[0]) return message.channel.send(`${this.client.emotes.error} - Don't you want to translate something?`);

		if (!query[1]) {
			lang = 'en';
		} else {
			lang = query[1];
		}

		try {
			const translated = await translate(query[0], { to: lang });

			let autoCorrected;
			let text;

			if (translated.from.text.autoCorrected === true) {
				autoCorrected = '(Auto-corrected)';
			} else {
				autoCorrected = '';
			}

			if (translated.from.text.value) {
				text = translated.from.text.value.replace(/[\[\]]+/g, '');
			} else {
				text = query[0];
			}

			const embed = new MessageEmbed()
				.setColor(this.client.config.discord.accentColor)
				.setTitle(`Google Translate`)
				.setDescription('Translate stuff')
				.addFields(
					{ name: `From ${ISO6391.getName(translated.from.language.iso)} ${autoCorrected}`, value: `\`\`\`\n${text}\n\`\`\``, inline: false },
					{ name: `To ${ISO6391.getName(lang)}`, value: `\`\`\`\n${translated.text}\n\`\`\``, inline: false }
				)
				.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();

			message.inlineReply(embed);
		} catch (err) {
			message.inlineReply(`${this.client.emotes.error} - **ERROR**\`\`\`js\n${err}\n\`\`\``);
		}
	}
};
