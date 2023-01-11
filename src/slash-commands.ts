// discord bot slash commands for minecraft server
export enum MinecraftCommands {
    START = "minecraft-start",
    GETPLAYERS = "minecraft-players",
    CHECKSTATUS = "minecraft-status",
    INFO = "minecraft-info",
    STOP = "minecraft-stop",
}
export default MinecraftCommands;

export const MinecraftCommandsDescriptions = {
    [MinecraftCommands.START]: "Starts the Minecraft server",
    [MinecraftCommands.GETPLAYERS]: "Gets the number of players on the Minecraft server",
    [MinecraftCommands.CHECKSTATUS]: "Checks if the Minecraft server is online",
    [MinecraftCommands.INFO]: "Gets information about the Minecraft server",
    [MinecraftCommands.STOP]: "Stops the Minecraft server",
}
