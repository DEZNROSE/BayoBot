const { Command } = require('discord.js-commando');
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rate',
            group: 'group1',
            memberName: 'rate',
            description: 'Rate what ever you want to Rate without fancy messageEmbed',
            examples: ['A+rate how your day?'],
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
        const { text } = args;
        msg.delete();
        msg.say (text + Math.floor((Math.random() * 100) + 1))
    }
};