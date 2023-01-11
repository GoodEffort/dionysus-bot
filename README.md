# dionysus-bot
Discord bot to manage my game servers


If you add this to your own server make a discord app and hook it into this code by adding your own discord-auth.json.

Once you have the auth info

    npm run prod

Will add commands to your server and start your bot

    npm run pm2

Will register the bot with pm2 and start it there

Either way works, pm2 is just a nice program to handle your bots.

The scripts in the /scripts folder are to get info from or start your servers, they will probably have to be adjusted to your environment