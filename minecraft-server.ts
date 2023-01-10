import { exec } from './exec';
import { Minecraft } from './config.json'
import { CacheType, CommandInteraction } from 'discord.js';
import { MinecraftCommands } from './slash-commands';

const { port, start, getPlayers, checkStatus } = Minecraft;

export const MinecraftServer = {
    [MinecraftCommands.START]: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.deferReply();
        try {
            const response = await exec(start);

            if (!response.stderr) {
                await interaction.editReply('Minecraft server started!');
            } else if (+response.stderr.replace(/\D/g, '') === 16) {
                await interaction.editReply('Minecraft server is already running!');
            } else {
                await interaction.editReply('Minecraft server failed to start!');
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply("Something went wrong!");
        }
    },
    [MinecraftCommands.GETPLAYERS]: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.deferReply();
        try {
            const response = await exec(getPlayers);

            if (!response.stderr) {
                await interaction.editReply(response.stdout);
            } else {
                throw new Error(response.stderr);
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply("Something went wrong!");
        }
    },
    [MinecraftCommands.CHECKSTATUS]: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.deferReply();
        try {
            const response = await exec(checkStatus);

            if (!response.stderr) {
                const out = response.stdout.replace(/\D/g, '');

                if (out == "0") {
                    await interaction.editReply('Minecraft server is offline!');
                } else {
                    await interaction.editReply('Minecraft server is online!');
                }
            } else {
                throw new Error(response.stderr);
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply("Something went wrong!");
        }
    },
    [MinecraftCommands.INFO]: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.deferReply();
        try {
            const reponse = await fetch('https://api.ipify.org');
            const ip = await reponse.text();
            await interaction.editReply(`Minecraft server IP: ${ip}:${port}`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("Something went wrong!");
        }

    },
}
export default MinecraftServer;