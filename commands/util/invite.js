const Commando = require('discord.js-commando');

module.exports = class InviteCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'util',
			memberName: 'invite',
			ownerOnly: false,
			guildOnly: false,
			description: 'Invite the bot to your server.',
		});
	}

	async run(message) {
		message.channel.send(`
${await this.client.language('Was too lazy to create a proper embed, so here\'s the invite link:', message)} https://dsc.gg/notmebot

${await this.client.language('Vote for me at Top.gg:', message)}
https://top.gg/bot/873922961491525682`
		);
	}
};
