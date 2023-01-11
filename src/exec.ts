import { exec as _exec } from 'child_process';
import { promisify } from 'util';
import { BotConfig, Minecraft } from './config';

// ew callbacks

const exec = promisify(_exec);

const cwdExec = (command:string, cwd: string) => {
    if (!command.startsWith("./")) {
        command = "./" + command;
    }

    return exec(command, { cwd });
}

export const minecraftExec = (command: string) => {
    const cwd =
        BotConfig.installDirectory +
        BotConfig.scriptDirectory +
        Minecraft.scriptDirectory;
    
    return cwdExec(command, cwd);
}
