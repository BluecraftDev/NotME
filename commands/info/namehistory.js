const Discord = require('discord.js');
const fetch = require('node-fetch');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'mcnamehistory',
			aliases: ['nh', 'namehistory'],
			group: 'info',
			memberName: 'mcnamehistory',
			ownerOnly: false,
			guildOnly: false,
			description: 'Get name history of a Minecraft player.',
			args: [
				{
					key: 'player',
					prompt: "Type the player's IGN please.",
					type: 'string',
				},
			],
		});
	}

	async run(message, { player }) {
		try {
			const playerUUIDFetch = await fetch(`https://api.mojang.com/users/profiles/minecraft/${player}`); // fetch uuid
			const playerUUIDData = await playerUUIDFetch.json();
			const playerNameHistory = await fetch(`https://api.mojang.com/user/profiles/${playerUUIDData.id}/names`); // fetch name history
			const playerNameData = await playerNameHistory.json();

			const embed = new Discord.MessageEmbed()
				.setTimestamp()
				.setAuthor('MC Name History', 'https://cdn.pixabay.com/photo/2016/11/11/14/49/minecraft-1816996_1280.png')
				.setTitle(`${playerNameData[playerNameData.length - 1].name}'s Name History`)
				.setThumbnail(`https://crafatar.com/avatars/${playerUUIDData.id}?overlay&size=256`)
				.setColor(this.client.config.discord.accentColor)
				.setFooter((await this.client.language(`Requested by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }));

			for (const length in playerNameData) {
				// name dividers
				for (const key in playerNameData[length]) {
					if (key == 'name' && playerNameData[length].changedToAt == undefined) {
						embed.addField(playerNameData[length][key], `\`${await this.client.language('Original Name', message)}\``, false);
					}
				}
			}

			for (const length in playerNameData) {
				for (const key in playerNameData[length]) {
					if (key == 'name') {
						if (playerNameData[length].changedToAt == undefined) {
							break;
						} else {
							const changedAtDate = new Date(playerNameData[length].changedToAt); // fetch first login date and time
							const changedAt = changedAtDate.toLocaleString(); // convert into cleaner date and time
							embed.addField(playerNameData[length][key], `\`${changedAt}\``, false);
						}
					}
				}
			}

			message.inlineReply(embed);
		} catch (err) {
			const error = new Discord.MessageEmbed()
				.setAuthor('Error', 'https://cdn.pixabay.com/photo/2016/11/11/14/49/minecraft-1816996_1280.png')
				.setDescription((await this.client.language('An error has occurred. Check spelling and name history.', message)))
				.setColor(this.client.config.discord.accentColor)
				.setFooter((await this.client.language(`Requested by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }));
			message.inlineReply(error);

			console.log(err);
		}
	}
};
