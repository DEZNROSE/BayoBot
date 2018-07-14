const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const fs = require('fs');
const path = require("path");
module.exports = class FishCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'fish',
      group: 'group1',
      memberName: 'fish',
      description: 'What type of fish will you catch.',
      examples: ['A+fish'],
    });
  }

  run(msg) {
    const data = JSON.parse(fs.readFileSync("./public/playerData.json", "utf8"));
    const playerData = typeof data === 'string' ? JSON.parse(data) : data;
    playerData[msg.author.id] = playerData[msg.author.id] === undefined ?
      [] : playerData[msg.author.id];
    const Fishes = [
      'Sushifish', 'Sleepyfish', 'Bombfish', 'Goldenfish', 'Frog', 'Silverfish',
      'Barb', 'Catfish', 'Cowfish', 'Shark', 'Eel',
      'Firefish', 'Gombessa', 'Jewfish', 'Ladyfish'
    ]
    const Fish = Fishes[Math.floor(Math.random() * Fishes.length)];
    const rateEmbed = new Discord.MessageEmbed({ title: `you got a ${Fish}` });
    rateEmbed.setColor("#FFB6C1");
    playerData[msg.author.id].push(Fish);
    fs.writeFileSync("./public/playerData.json", JSON.stringify(playerData), "utf8")
    return msg.say({ embed: rateEmbed });
  }
};