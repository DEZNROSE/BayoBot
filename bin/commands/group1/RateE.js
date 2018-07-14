const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ratee',
            group: 'group1',
            memberName: 'ratee',
            description: 'Rate what ever you want to Rate with fancy messageEmbed',
            examples: ['A+ratee how your day?'],
           throttling: {
        usages: 2,
        duration: 10
    },
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        });    
    }
run(msg, args) {
  const {text} = args;
  msg.delete();
  const rateEmbed = new Discord.MessageEmbed({title:`${text} ${Math.floor(Math.random() * 100)}`})
rateEmbed.setColor("#FFB6C1")
return msg.say({embed: rateEmbed})
}

};