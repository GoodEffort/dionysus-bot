export const token = "Bot token from discord dev portal here";
export const guildId = "GuildId from Discord Server here";
export const clientId = "Client Id from Discord dev portal here";
export const username = "username of the account running the dedicated server on the machine";
export enum Minecraft {
    PORT = "25565",
    SCREENSESSION = "minecraft",
    START = "/home/steam/minecraft/scripts/start-screen-session.sh -t",
    GETPLAYERS = "/home/steam/minecraft/scripts/get-number-of-players.sh",
    CHECKSTATUS = "/home/steam/minecraft/scripts/check-minecraft-server.sh",
}
// for the future
export enum Valheim {}
export enum Satisfactory {}
export enum Factorio {}