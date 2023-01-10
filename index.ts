import { Client, GatewayIntentBits } from 'discord.js';
import { commandIsEnum } from './commandIsEnum';
import { token } from './discord-auth';
import { MinecraftServer } from './minecraft-server';
import { MinecraftCommands } from './slash-commands';

// I don't think these are right but it works
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandIsEnum(MinecraftCommands, commandName)) {
        await MinecraftServer[commandName](interaction);
    }
});

client.login(token);