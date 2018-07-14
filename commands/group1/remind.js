const {Command} = require('discord.js-commando');
const moment = require('moment')

module.exports = class RemindCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remind',
            group: 'group1',
            memberName: 'remind',
            description: 'sets a reminder for the user with the specified amount of time.',
            examples: ['remind Buy dinner at 8. 8hours 10minutes', 'remind Sleep at 7. 30m', 'remind Mom\'s Birthday. 10days'],
            args: [
                {
                    key: 'text',
                    prompt: 'Enter the words to prompt your reminder.',
                    type: 'string',
                }
            ]
        });
    }
    run(msg, args) {
        const { text } = args;
        remindLater(text, (contents, time) => {
            setTimeout(() => {
                msg.say(`Your Reminder: ${contents}`)
                    .then(msg => console.log(`Sent msg ${msg['content']}`))
                    .catch(console.error);
            }, time);
        });
        return msg.say('Okay, I set a reminder for you big boy. *witch time* ');
    }
};
function remindLater(msg, callback) {
    const startMoment = moment();
    const endMoment = moment();
    const parsedString = msg.replace(/(\d+)(\w+)/ig, (match, ...args) => {
        const data = /(\d+)(\w+)/ig.exec(match);
        if (data !== null) {
            endMoment.add(parseInt(data[1]), data[2]);
        }
        return '';
    });
    callback(parsedString, Math.abs(startMoment.diff(endMoment)));
}