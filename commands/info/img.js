const Discord = require('discord.js')
const request = require("request")
const cheerio = require('cheerio');
const { stripIndents } = require("common-tags");

module.exports = {
    name: "img",
    category: "info",
    description: "img search",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();
        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        var parts = message.content.split(" "); 
        if (parts[0] === "img") { // Check if first part of message is image command

            // call the image function
            image(message, parts); // Pass requester message to image function

        }

        var search = parts.slice(1).join(" ");
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options, function (error, response, responseBody) {
            if (error) {
                // handle error
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            console.log(urls);
            if (!urls.length) {
                // Handle no results
                return;
            }

            // Send result
            message.channel.send(urls[0]);
        });
    }
}