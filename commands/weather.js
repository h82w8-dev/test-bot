const { RichEmbed } = require("discord.js");
const weather = require('weather-js');

module.exports = {
    name: "weather",
    category: "info",
    description: "weater in you city",
    aliases: ["array", "of", "aliases"],
    usage: "[args input]",
    run: async (client, message, args) => {

            weather.find({
            search: args.join(" "),
            degreeType: 'C'
        }, function (err, result) {
            if (err) console.log(err);
            if (result === undefined || result.length === 0) {
                message.channel.send({
                    embed: {
                        "description": "**Enter place**",
                        "title": "Error",
                        "color": 0xff2222
                    }
                });
                return;
            }
            var current = result[0].current;
            var location = result[0].location;
            const embed = new RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', location.degreetype, true)
                .addField('Temperature', `${current.temperature} Degrees`, true)
                .addField('Feels like', `${current.feelslike} Degrees`, true)
                .addField('Winds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
            message.channel.send({
                embed
            });
        })

    }
}