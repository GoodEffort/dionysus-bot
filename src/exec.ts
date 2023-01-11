import { exec as _exec } from 'child_process';
import { promisify } from 'util';
import { BotConfig, Minecraft } from './config';

// ew callbacks

const exec = promisify(_exec);

export const minecraftExec = (command: string) => {
    const cwd =
        BotConfig.installDirectory +
        BotConfig.scriptDirectory +
        Minecraft.scriptDirectory;
    
    return exec(command, { cwd });
}
