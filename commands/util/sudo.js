const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'sudo',
			group: 'util',
			memberName: 'sudo',
			ownerOnly: true,
			guildOnly: true,
			hidden: true,
			description: 'Stands for superuser do.',
			argsType: 'multiple',
			clientPermissions: ['MANAGE_MESSAGES', 'MANAGE_WEBHOOKS'],
		});
	}

	async run(message, args) {		
		await this.client.weky.Sudo({
			message: message,
			member: message.mentions.members.first(),
			text: args.slice(1).join(" "),
			deleteMessage: true
		});
	}
};
