import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from './discord-auth';
import { MinecraftCommands } from './slash-commands'

export async function deployCommands() {
    console.log('Started refreshing application (/) commands.');
    const commands = [
        new SlashCommandBuilder().setName(MinecraftCommands.START).setDescription('Starts the Minecraft server'),
        new SlashCommandBuilder().setName(MinecraftCommands.GETPLAYERS).setDescription('Gets the number of players on the Minecraft server'),
        new SlashCommandBuilder().setName(MinecraftCommands.CHECKSTATUS).setDescription('Checks if the Minecraft server is online'),
        new SlashCommandBuilder().setName(MinecraftCommands.INFO).setDescription('Gets information about the Minecraft server'),
    ].map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(token);

    try {

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

export default deployCommands;