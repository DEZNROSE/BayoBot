const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lenny',
            group: 'group1',
            memberName: 'lenny',
            description: '( ͡° ͜ʖ ͡°).',
            examples: ['reply']
        });
    }

    run(msg) {
        return msg.say('( ͡° ͜ʖ ͡°)!');
    }
};