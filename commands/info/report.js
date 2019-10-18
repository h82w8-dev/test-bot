const { RichEmbed } = require("discord.js");

module.exports = {
    name: "report",
    category: "info",
    description: "report users",
    aliases: ["array", "of", "aliases"],
    usage: "[args input]",
    run: async (client, message, args) => {
        message.delete()
        let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!target) return message.channel.send("Couldn't find user.");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new RichEmbed()
            .setDescription("Reports")
            .setColor("#15f153")
            .addField("Reported User", `${target} with ID: ${target.id}`)
            .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", reason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        if (!reportschannel) return message.channel.send("Couldn't find reports channel.");

        message.channel.send("Your reported has been filed to the staff team. Thank you!").then(m => m.delete(15000))
        message.delete().catch(O_o => { });
        reportschannel.send(reportEmbed);

    }
}