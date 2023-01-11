import { deployCommands } from './deploy-commands';
import { startBot } from './start-dionysus-bot';

deployCommands().then(() => {
    startBot();
});