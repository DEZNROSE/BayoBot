const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');
console.log.playerData
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'inv',
            group: 'group1',
            memberName: 'inv',
            description: 'check your inv.',
            examples: ['A+inv']
            
        });
    }

   

run(msg) {
const playerData = JSON.parse(fs.readFileSync('./public/playerData.json', "utf8"));
const InvData = playerData[msg.author.id].slice(1, playerData[msg.author.id].length);
if(typeof playerData[msg.author.id] !== Object) playerData[msg.author.id].unshift({name:'gil', value:0});
playerData[msg.author.id].value += 12;
  //Assuming it's an array
const InvList = InvData.join(" ");
const embed = new Discord.MessageEmbed({title:"Inv", name:'gil', value:0, description: InvList,"footer": {
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
    "text":  `${playerData[msg.author.id][0].name} : ${playerData[msg.author.id][0].value}`
  },});
  embed.setColor("#FFB6C1");
  msg.say({embed:embed});        
    }
};