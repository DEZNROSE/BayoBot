const { Command } = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rdm#',
            group: 'group1',
            memberName: 'rdm#',
            description: 'Replies with a Message.',
            examples: ['reply']
        });
    }
    run(msg) {
  msg.delete();
  const rateEmbed = new Discord.MessageEmbed({title:`${Math.floor(Math.random() * 100)}`})
      rateEmbed.setColor("#FFB6C1")
return msg.say({embed: rateEmbed})
        return msg.embed(embed);  
    }
};