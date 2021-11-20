const Commando = require('discord.js-commando');
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' });

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'tic-tac-toe',
			aliases: ['ttt'],
			group: 'games',
			memberName: 'tic-tac-toe',
			ownerOnly: false,
			guildOnly: true,
			description: 'x and o',
			clientPermissions: ['ADD_REACTIONS', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'VIEW_CHANNEL'],
			format: '[user]'
		});
	}

	async run(message) {
		game.handleMessage(message);
	}
};
