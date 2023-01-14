import { Minecraft } from './config'
import { CacheType, CommandInteraction } from 'discord.js';
import { MinecraftCommands } from './slash-commands';
import { minecraftExec } from './exec';

const { port, start, getPlayers, checkStatus, stop } = Minecraft;

async function getServerURL() {
    let url: string;
    try {
        url = (await import('./ignore-config')).url;
    } catch { 
        url = (await import('./server-config')).url;
    }
    return url;
}

export const MinecraftServer = {
    [MinecraftCommands.START]: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.deferReply();
        try {
            const response = await minecraftExec(start);

            console.log(response);

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
            const response = await minecraftExec(getPlayers);

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
            const response = await minecraftExec(checkStatus);

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
            const url = await getServerURL();
            await interaction.editReply(`Minecraft server address ${ url }`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("Something went wrong!");
        }

    },
    [MinecraftCommands.STOP]: async (interaction: CommandInteraction<CacheType>) => {
        await interaction.deferReply();
        try {
            const response = await minecraftExec(stop);

            if (!response.stderr) {
                await interaction.editReply('Minecraft server stopped!');
            } else if (+response.stderr.replace(/\D/g, '') === 16) {
                await interaction.editReply('Minecraft server is already stopped!');
            } else {
                await interaction.editReply('Minecraft server failed to stop!');
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply("Something went wrong!");
        }
    },
}
export default MinecraftServer;