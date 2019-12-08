const { RichEmbed } = require("discord.js");
const { stripIndets } = require("common-tags");
const fetch = require("node-fetch");

module.exports = {
    name: "test",
    aliases: ["t"],
    category: "fub",
    description: "affix mb?",
    run: async (client, message, args) => {
        const name = args.join(" ");

        if(!name) {
            return message.reply("Maybe it's userful!")
                .then(m => m.delete(3000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;
        const res = await fetch(url).then(url => url.json());

        console.log(res);
    }
}
