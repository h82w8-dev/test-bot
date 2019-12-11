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
        
    fetch('https://wowaffixes.info')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => ...)
        
        
    }
}
