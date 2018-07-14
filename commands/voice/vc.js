
const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vc',
            group: 'voice',
            memberName: 'vc',
            description: 'join vc',
            examples: ['vc']
        });
    }

    run(msg) {
  { 
             // Note that this will only work if the msg was sent in a guild
             // and the author is actually in a voice channel.
             // You might want to check for all that stuff first 
            const channel = msg.member.voiceChannel; 
            channel.join() 
            .then(connection => console.log('Connected!')) 
            .catch(console.error); } }
};
