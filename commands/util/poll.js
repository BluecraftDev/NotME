const functions = require('../../utils/functions.js');
const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'poll',
			group: 'util',
			memberName: 'poll',
			ownerOnly: false,
			guildOnly: true,
			description: 'Creates a poll.',
			argsType: 'multiple',
			userPermissions: ['MENTION_EVERYONE'],
			format: '<title> <duration> <...options>'
		});
	}

	async run(message, args) {		
		await functions.pollEmbed(this.client, message, args[0], args[1], args.slice(2));
	}
};
