import { StandardEnum } from "./types/StandardEnum";

export function commandIsEnum<
    T extends StandardEnum,
    K extends keyof T>(enumerator: T, commandName: string): commandName is T[K] {
    return (Object.values(enumerator) as string[]).includes(commandName);
}
export default commandIsEnum;