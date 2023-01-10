import { Client, GatewayIntentBits } from 'discord.js';
import { token, Minecraft } from './config';
import { promisify } from 'util';
import { exec as _exec } from 'child_process';

// promisify the exec function because nobody likes callbacks (well I don't)
const exec = promisify(_exec);

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
    let output: string;
    let response: { stdout: string, stderr: string } | undefined = undefined;

    switch(commandName) {
        case 'StartMinecraft':
            await interaction.deferReply();

            response = await exec(Minecraft.START);
            if (response.stderr == "0") {
                await interaction.editReply('Minecraft server started!');
            } else {
                await interaction.editReply('Minecraft server failed to start!');
            }
        break;
        case 'GetPlayersMinecraft':
            await interaction.deferReply();
            response = await exec(Minecraft.GETPLAYERS);

            if (response.stderr == "0") {
                await interaction.editReply(`There are ${response.stdout} players online!`);
            } else {
                await interaction.editReply('Minecraft server is offline!');
            }
        case 'CheckStatusMinecraft':
            await interaction.deferReply();
            response = await exec(Minecraft.CHECKSTATUS);

            if (response.stdout == "0") {
                await interaction.editReply('Minecraft server is offline!');
            } else {
                await interaction.editReply('Minecraft server is online!');
            }
    }
});

client.login(token);