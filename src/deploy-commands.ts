import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildIds, token } from './discord-auth';
import { StandardEnum } from './types/StandardEnum';
import { MinecraftCommands, MinecraftCommandsDescriptions } from './slash-commands'

function buildCommands<
    Commands extends StandardEnum
>(
    commandsEnum: Commands,
    descriptionsEnum: { [key in Commands[keyof Commands]]: string },
) {
    const commands: SlashCommandBuilder[] = [];
    for (const commandKey in commandsEnum) {
        const command = commandsEnum[commandKey];
        const description = descriptionsEnum[command];
        if (description === undefined) throw new Error(`No description for command ${command}!`);
        const commandBuilder = new SlashCommandBuilder()
            .setName(command)
            .setDescription(description)

        commands.push(commandBuilder);
    }
    return commands;
}

export async function deployCommands() {
    console.log('Started refreshing application (/) commands.');
    const commands = 
        ([] as SlashCommandBuilder[])
        .concat(
            buildCommands(MinecraftCommands, MinecraftCommandsDescriptions),
            // add more builders here
        ).map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(token);

    try {

        for (const guildId of guildIds) 
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

export default deployCommands;