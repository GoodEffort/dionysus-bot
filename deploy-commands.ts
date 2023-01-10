import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from './config';

const commands = [
    new SlashCommandBuilder().setName('StartMinecraft').setDescription('Starts the Minecraft server'),
    new SlashCommandBuilder().setName('GetPlayersMinecraft').setDescription('Gets the number of players on the Minecraft server'),
    new SlashCommandBuilder().setName('CheckStatusMinecraft').setDescription('Checks if the Minecraft server is online'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
