const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rps',
            group: 'group1',
            memberName: 'rps',
            description: 'Rock, Paper, Scissors.',
            examples: ['A+game1 Rock, Paper, Scissors'],
            args: [
                {
                    key: 'text',
                    prompt: 'Input Rock, Paper, or Scissors Fool!',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, args) {
        const { text } = args;
    {
const answers = ['Rock', 'Paper', 'Scissors']
const answer = answers[Math.floor(Math.random() * answers.length)]
if( answer ===  'Rock' && text ===  'Paper' ){
const rateEmbed = new Discord.MessageEmbed({title:`User:${text} Bot: ${answer} User win!!!`})
rateEmbed.setColor("#FFB6C1")
return msg.say({embed: rateEmbed})
}
if( answer ===  'Rock' && text ===  'Scissors' ){
    const rateEmbed = new Discord.MessageEmbed({title:`User:${text} Bot: ${answer} User Lose!!!`})
    rateEmbed.setColor("#FFB6C1")
    return msg.say({embed: rateEmbed})
}
if( answer ===  'Paper' && text ===  'Scissors' ){
    const rateEmbed = new Discord.MessageEmbed({title:`User:${text} Bot: ${answer} User win!!!`})
    rateEmbed.setColor("#FFB6C1")
    return msg.say({embed: rateEmbed})
    }
    if( answer === 'Paper' && text ===  'Rock' ){
        const rateEmbed = new Discord.MessageEmbed({title:`User:${text} Bot: ${answer} User Lose!!!`})
        rateEmbed.setColor("#FFB6C1")
        return msg.say({embed: rateEmbed})
    }

    if( answer ===  'Scissors' && text ===  'Rock' ){
        const rateEmbed = new Discord.MessageEmbed({title:`User:${text} Bot: ${answer} User win!!!`})
        rateEmbed.setColor("#FFB6C1")
        return msg.say({embed: rateEmbed})
        }
        if( answer === 'Scissors' && text ===  'Paper' ){
            const rateEmbed = new Discord.MessageEmbed({title:`User:${text} Bot: ${answer} User Lose!!!`})
            rateEmbed.setColor("#FFB6C1")
            return msg.say({embed: rateEmbed})
        }
        if( answer === text ){
            const rateEmbed = new Discord.MessageEmbed({title:`User:${text} Bot: ${answer} Draw!!!`})
            rateEmbed.setColor("#FFB6C1")
            return msg.say({embed: rateEmbed})
        }

    }
    
}
};