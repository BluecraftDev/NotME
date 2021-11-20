const Commando = require('discord.js-commando');

module.exports = class UnknownCommandCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'unknown-command',
    		group: 'util',
    		memberName: 'unknown-command',
    		description: 'Displays help information for when an unknown command is used.',
    		examples: ['unknown-command kickeverybodyever'],
    		unknown: true,
    		hidden: true
		});
	}

	async run(message) {
		return;
	}
};