const RichEmbed = require("discord.js");
const stripIndets = require("common-tags");
const fetch = require("node-fetch");

module.exports = {
    name:"instagram",
    aliases: ["insta"],
    category: "info",
    description: "Find out some instagram statistic",
    usage: "<name>",
    
    run: async (client, message, args) => {
    const name = args.join(" ");

        if (!name) {
            return message.reply("Maybe it's useful to search...")
                .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;
        const res = await fetch(url).then(url => url.json());

        if (!res.graphql.user.username) {
            return message.reply("no user find...")
                .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(account.external_url_linkshimmed)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile Information", stripIndets`**- Username:** ${account.username}
            **- Fullname:** ${account.full_name}
            **- Biography:** ${account.biography.lenght == 0 ? "none" : account.biography}
            **- Posts** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Privete account:** ${account.is_private ? "Yes 🔒" : "Nope 🔓"}`);

        message.channel.send(embed);
    }
}
