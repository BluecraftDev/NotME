const Commando = require('discord.js-commando');

module.exports = class Command extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'unban',
			group: 'moderation',
			memberName: 'unban',
			ownerOnly: false,
			guildOnly: true,
			description: 'Unbans someone.',
			args: [
				{
					key: 'member',
					prompt: 'Which user do you want to unban? (user ID)',
					type: 'string',
				},
			],
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
		});
	}

	async run(message, { member }) {
		const id = member;

		if (!id) {
			return message.inlineReply(`${this.client.emotes.error} - ${await this.client.language('Unable to find this user!', message)}`);
		}

		const bannedMembers = await message.guild.fetchBans();

		if (!bannedMembers.find((user) => user.user.id === id)) {
			return message.inlineReply(`${this.client.emotes.error} - ${await this.client.language('That user is already unbanned!', message)}`);
		}

		message.guild.members.unban(id);
		message.inlineReply(`${this.client.emotes.success} - ${await this.client.language('Unbanned user!', message)}`);
	}
};
