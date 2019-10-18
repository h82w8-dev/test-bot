const { RichEmbed } = require("discord.js");

module.exports = {
    name: "pool",
    category: "info",
    description: "create a question",
    aliases: ["array", "of", "aliases"],
    usage: "[args input]",
    run: async (client, message, args) => {
        let question = args.join(' ');

        message.channel.send({
            embed: {
                "title": "Опрос:",
                "description": question + "",
                "color": "3264944",
                "footer": {
                    "text": "Опрос создал " + message.author.username,
                    "icon_url": message.author.avatarURL
                }
            }
        }).then(() => {
            message.channel.awaitMessages(response => response.content === "reports", {
                max: 5,
                time: 10000,
                errors: ['reports'],
            })
                .then((collected) => {
                    message.channel.send(`The collected message was: ${collected.content}`);
                })
                .catch(() => {
                    message.channel.send('There was no collected message that passed the filter within the time limit!');
                });
        });

    }
}