export enum BotConfig {
    // bot install directory
    installDirectory = "/home/steam/dionysus-bot/",

    // bot script directory (in bot install directory)
    scriptDirectory = "scripts/",
}

export enum Minecraft {
    // script vars
    port = 25565,
    screenSession = "minecraft",

    // minecraft server directory
    installDirectory = "/home/steam/minecraft/",

    // script directory (in bot script directory)
    scriptDirectory = "minecraft/",

    // script names and flags
    start = "start-screen-session.sh -t",
    getPlayers = "bot-get-number-of-players.sh",
    checkStatus = "check-minecraft-server.sh",
    stop = "send-command.sh -c stop",
};

export enum Valheim {};
export enum Satisfactory {};
export enum Factorio {};