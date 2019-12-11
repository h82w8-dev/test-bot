const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
    name: "lol",
    aliases: ["l"],
    category: "info",
    description: "Find out some nice instagram statistics",
    usage: "<name>",
    run: async (client, message, args) => {
        const name = args.join(" ");

        if (!name) {
            return message.reply("search for ...!")
                .then(m => m.delete(5000));
        }
        
        const url = `https://mythicpl.us/${name}`;
        const res = await fetch(url).then(url => url.json());

        console.log(res);

    }
}
