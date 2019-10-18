const { RichEmbed } = require("discord.js");

module.exports = {
    name: "flip",
    category: "info",
    description: "орел или решка",
    aliases: ["array", "of", "aliases"],
    usage: "[args input]",
    run: async (client, message, args) => {

        message.channel.send({
            embed: {
                "description": `Результат: **${Math.floor(Math.random() * 2) == 0 ? "орёл" : "решка"}**!`,
                "color": 11468594,
                "image": {
                    "url": "https://cdn.dribbble.com/users/722835/screenshots/2434202/01coin.gif"
                }
            }
        }).then(msg => {
            if (conf[message.guild.id].delete == 'true') {
                msg.delete(conf[message.guild.id].deleteTime);
            }
        });
    }
}