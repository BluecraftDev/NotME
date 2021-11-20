const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

function disambiguation(items, label, property = 'name') {
	const itemList = items.map(item => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
	return `Multiple ${label} found, please be more specific: ${itemList}`;
}

module.exports = class HelpCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'help',
			aliases: ['h', 'cmds', 'commands', 'modules'],
			group: 'util',
			memberName: 'help',
			description: 'Displays a list of available commands, or detailed information for a specified command.',
			details: 'The command may be part of a command name or a whole command name. If it isn\'t specified, all available commands will be listed.',
			examples: ['help', 'help prefix'],
			guarded: true,
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to view the help for?',
					type: 'string',
					default: ''
				}
			]
		})
	}

	async run(message, args) {
		const groups = this.client.registry.groups;
		const commands = this.client.registry.findCommands(args.command, false, message);
		const showAll = args.command && args.command.toLowerCase() === 'all';

		if (args.command && !showAll) {
			if (commands.length == 1) {
				const embed = new MessageEmbed()
					.setTitle(`Command help for ${commands[0].name}`)
					.setColor(this.client.config.discord.accentColor)
					.setThumbnail(this.client.user.displayAvatarURL())
					.setDescription(commands[0].description)
					.setFooter('Required arguments: <> - Optional arguments: []')
					.setTimestamp()
					.addFields(
						{ name: 'Name', value: commands[0].name, inline: true },
						{ name: 'Group', value: commands[0].group.name, inline: true },
						{ name: 'Alias(es)', value: commands[0].aliases.length < 1 ? 'None' : commands[0].aliases.map(x => `\`${x}\``).join(', '), inline: true },
						{ name: 'Details', value: commands[0].details ? commands[0].details : 'None', inline: false },
						{ name: 'Usage', value: message.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`), inline: false }
					);

				message.channel.send(embed);
			} else if (commands.length > 15) {
				return message.inlineReply('Multiple commands found. Please be more specific.');
			} else if (commands.length > 1) {
				return message.inlineReply(disambiguation(commands, 'commands'));
			} else {
				return message.inlineReply(
					`Unable to identify command. Use ${message.usage(
						null, message.channel.type === 'dm' ? null : undefined, message.channel.type === 'dm' ? null : undefined
					)} to view the list of all commands.`
				);
			}
		} else {
			const embed = new MessageEmbed()
				.setTitle('Help Panel')
				.setThumbnail(this.client.user.displayAvatarURL())
				.setColor(this.client.config.discord.accentColor)
				.setDescription(`
					[Invite ${this.client.user.username}](https://dsc.gg/notmebot) - [Support Server](https://discord.gg/9pFVkFXeuN)\n
					To run a command in **${message.guild ? message.guild.name : 'any servers'}**, use ${Commando.Command.usage('command', message.guild ? message.guild.commandPrefix : null, this.client.user)}. For example, ${Commando.Command.usage('prefix', message.guild ? message.guild.commandPrefix : null, this.client.user)}.
					`)
				.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();

			groups.filter(grp => grp.commands.some(cmd => !cmd.hidden && (showAll || cmd.isUsable(message))))
				.map(grp => {
					embed.addField(grp.name, grp.commands.filter(cmd => !cmd.hidden && (showAll || cmd.isUsable(message)))
					.map(cmd => `\`${cmd.name}\``).join(', '), false);
				});

			return message.channel.send(embed);
		}
	}
}
