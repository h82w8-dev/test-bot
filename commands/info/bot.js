const { RichEmbed } = require("discord.js");

module.exports = {
    name: "bot",
    category: "info",
    description: "About bot",
    aliases: ["array", "of", "aliases"],
    usage: "[args input]",
    run: async (client, message, args) => {

        let bicon = client.user.displayAvatarURL;
        let botembed = new RichEmbed()
            .setDescription("Bot Information")
            .setColor("#15f153")
            .setThumbnail(bicon)
            .addField("Bot Name", client.user.username)
            .addField("Created On", client.user.createdAt)
            .setFooter("🔪 oldfag#3527");

        message.channel.send(botembed);
    }
}