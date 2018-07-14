const { Command } = require('discord.js-commando');

module.exports = class testCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tsundere',
            group: 'group1',
            memberName: 'tsundere',
            description: 'tsundere.',
            examples: ['tsundere']
        });
    }

    run(msg) {
       var number = 9;
       var RandomQuestion = Math.floor(Math.random() * number) + 1;
       switch (RandomQuestion) {
           case 1: return msg.say('B-Baka!!');
           case 2: return msg.say('Dont misunderstand, its not like I like you or anything...');
           case 3: return msg.say('T-Tch! S-Shut up!');
           case 4: return msg.say('Youre such a slob!');
           case 5: return msg.say('Are you stupid?');
           case 6: return msg.say('Im just here because I had nothing else to do!');
           case 7: return msg.say('BAKAAAAAAAAAAAAAAA!!!!! YOURE A BAKAAAAAAA!!!!');
           case 8: return msg.say('Can you be ANY MORE CLUELESS?');
           case 9: return msg.say('I like you, you idiot!');
           
       }
    }
};