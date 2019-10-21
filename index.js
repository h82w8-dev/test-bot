const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");


const client = new Client({
    disableEveryone: true
})

// Collections
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready",() => {
    console.log(`I am now online, my name is ${client.user.username}`);

    setInterval(async () => {
        let textList = ['как работают негры', 'иммолейт импрувед']
        var text = textList[Math.floor(Math.random() * textList.length)];
        client.user.setActivity("" + text, { type: 'WATCHING' })
    }, 5000) // milliseconds
   
});

client.on("message", async message => {
    console.log(`${message.author.username} said: ${message.content}`);
    const prefix = "_";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command)
        command.run(client, message, args);


});


client.on('ready', () => {
    setTimeout(function () { // in leftToEight() milliseconds run this:
        sendMessage(); // send the message once
        var dayMillseconds = 1000 * 60 * 60 * 24;
        setInterval(function () { // repeat this every 24 hours
            sendMessage();
        }, dayMillseconds)
    }, leftToEight())
})

function leftToEight() {
    var d = new Date();
    return (-d + d.setHours(10, 40, 0, 0));
}

function sendMessage() {
    var guild = client.guilds.get('259759253244346369');
    if (guild && guild.channels.get('626149716530429968')) {
        guild.channels.get('626149716530429968').send("_999");
    }
}


client.on('message', message => {
    if (message.content.startsWith("_999")) {
        message.delete()
        const user = message.guild.members.random();
        const quotes = ["Что тут у нас ? \n А моглибы на работе делом заниматься... \n Проверяю дымоходы...\n Стоять! Не двигаться! Вы обявленны пидором дня, ", "Инициирую поиск пидора дня.. \n Машины выехали \n Так-так, что же тут у нас... \n Сегодня ты пидор,", "Woob-woob, that's da sound of da pidor-police! \n Выезжаю на место... \n Но кто же он? \n Вот и ты пидор дня "];
        const theSpam = quotes[Math.floor(Math.random() * quotes.length)]
        if (message.author.id === '619623557848367144'){
            message.channel.send(theSpam + `${user.user}`)
        }
    }
})


client.login(process.env.TOKEN);
