const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const discordClient = new Client({ intents: [
        GatewayIntentBits.Guilds,
    ]
});

require('console-stamp')(console, 'HH:MM:ss.l');

if (!process.env.DISCORD_API_KEY || process.env.DISCORD_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_API_KEY does not exists or is empty!');
    process.exit(1);
}

const discordApiKey = process.env.DISCORD_API_KEY;
discordClientRef = discordClient;
discordClientRef.login(discordApiKey)

discordClientRef.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
    discordClientRef.user.setPresence({
        activities: [{ name: '?', type: ActivityType.Watching }],
        status: 'online'
    });

    try {
        fetch(options.url)
            .then(callback);
    } catch (exception) {
        console.log(`ERROR: ${exception}`);
    }
});

const options = {
    url: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle'
};

function callback(res) {
    console.log("Got response with http-code: " + res.status + " - " + res.statusText);

    if (res.ok) {
        res.json().then(function onData(jsonObject) {
            const slowGwei = jsonObject.result.SafeGasPrice;
            const normalGwei = jsonObject.result.ProposeGasPrice;
            const fastGwei = jsonObject.result.FastGasPrice;

            console.log("[SLOW] " + slowGwei + " gwei");
            console.log("[NORMAL] " + normalGwei + " gwei");
            console.log("[FAST] " + fastGwei + " gwei");
            discordClientRef.user.setPresence({
                activities: [{ name: slowGwei + '/' + normalGwei + '/' + fastGwei + ' -- SLOW / NORMAL / FAST', type: ActivityType.Watching }],
                status: 'online'
            });
        });
    } else {
        discordClientRef.user.setPresence({
            activities: [{ name: '?', type: ActivityType.Watching }],
            status: 'online'
        });
    }
}

setInterval(function() {
    console.log("Requesting... " + options.url);

    try {
        fetch(options.url)
            .then(callback);
    } catch (exception) {
        console.log(`ERROR: ${exception}`);
    }
}, 1000*300);

console.log("Logging in...");
discordClientRef.login(discordApiKey);
