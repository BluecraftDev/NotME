const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { exec } = require("child_process");

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'execute',
			aliases: ['exec'],
			group: 'util',
			memberName: 'execute',
			ownerOnly: true,
			guildOnly: false,
			hidden: true,
			description: 'Executes CLI code.',
			format: '<CLI code>'
		});
	}

	async run(message, args) {
		exec(args, function (error, stdout, stderr) {
			if (error) {
				console.log(error.stack);
				console.log('Error code: ' + error.code);
				console.log('Signal received: ' + error.signal);
			}

			const embed = new MessageEmbed()
				.setColor(message.client.config.discord.accentColor)
				.addField('Result', `\`\`\`js\n${stdout}\n\`\`\``, false)
				.addField('Error(s)', `\`\`\`js\n${stderr ? stderr : 'None'}\n\`\`\``, false)
				.setFooter(message.client.requestedBy, message.author.displayAvatarURL())
				.setTimestamp();

			message.channel.send(embed);
		});
	}
};
