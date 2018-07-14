const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sayn',
            group: 'group1',
            memberName: 'sayn',
            description: 'Make the bot say what ever you want to Rate without fancy messageEmbed',
            examples: ['A+say how your day?'],
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
  console.log(Discord.MessageEmbed);
  msg.delete();
return msg.say(text)
}

};;