const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'askbayo',
            group: 'group1',
            memberName: 'askbayo',
            description: 'Ask a question to bayo bot?.',
            examples: ['A+askbayo Question'],
            args: [
                {
                    key: 'text',
                    prompt: 'Input A Question Fool!',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, args) {
        const { text } = args;
    {
const answers = ['sassy1', 'sassy2', 'sassy3', 'sassy4', 'sassy5']
const answer = answers[Math.floor(Math.random() * answers.length)]
if( answer ===  'sassy1'){
const rateEmbed = new Discord.MessageEmbed({title:`Question:${text} Anwser: No!!!`})
rateEmbed.setColor("#FFB6C1")
return msg.say({embed: rateEmbed})
}
if( answer === 'sassy2'){
const rateEmbed = new Discord.MessageEmbed({title:`Question:${text} Anwser: Yes!!!`})
rateEmbed.setColor("#FFB6C1")
return msg.say({embed: rateEmbed})
}
if( answer === 'sassy3'){
const rateEmbed = new Discord.MessageEmbed({title:`Question:${text} Anwser: Maybe think a lil bit bout your question.`})
rateEmbed.setColor("#FFB6C1")
return msg.say({embed: rateEmbed})

} 

if( answer === 'sassy4'){
    const rateEmbed = new Discord.MessageEmbed({title:`Question:${text} Anwser: Like I care...`})
    rateEmbed.setColor("#FFB6C1")
    return msg.say({embed: rateEmbed})
    
}

if( answer === 'sassy5'){
    const rateEmbed = new Discord.MessageEmbed({title:`Question:${text} Anwser: Ask again like never.`})
    rateEmbed.setColor("#FFB6C1")
    return msg.say({embed: rateEmbed})
    
}

    }
    
}
};