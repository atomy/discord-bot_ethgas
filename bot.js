const fetch = require('node-fetch');
const Discord = require('discord.js');

const client = new Discord.Client();
require('console-stamp')(console, 'HH:MM:ss.l');

if (!process.env.DISCORD_API_KEY || process.env.DISCORD_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_API_KEY does not exists or is empty!');
    process.exit(1);
}

const discordApiKey = process.env.DISCORD_API_KEY;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('? USD', { type: 'WATCHING' } );
    fetch(options.url)
        .then(callback);
});

const options = {
    url: 'http://ethgas.watch/api/gas'
};

function callback(res) {
    console.log("Got response with http-code: " + res.status + " - " + res.statusText);

    if (res.ok) {
        res.json().then(function onData(jsonObject) {
            const slowGwei = jsonObject.slow.gwei;
            const normalGwei = jsonObject.normal.gwei;
            const fastGwei = jsonObject.fast.gwei;
            const instantGwei = jsonObject.instant.gwei;

            console.log("[SLOW] " + slowGwei + " gwei");
            console.log("[NORMAL] " + normalGwei + " gwei");
            console.log("[FAST] " + fastGwei + " gwei");
            console.log("[INSTANT] " + instantGwei + " gwei");
            client.user.setActivity(
                slowGwei + '/' + normalGwei + '/' + fastGwei + '/' + instantGwei + ' -- SLOW / NORMAL / FAST / INSTANT',
                { type: 'WATCHING' }
            );
        });
    } else {
        client.user.setActivity('?', { type: 'WATCHING' } );
    }
}

setInterval(function() {
    console.log("Requesting... " + options.url);
    fetch(options.url)
        .then(callback);
}, 1000*300);

console.log("Logging in with: " + discordApiKey);
client.login(discordApiKey);
