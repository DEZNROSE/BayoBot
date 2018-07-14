const {CommandoClient} = require('discord.js-commando')
const fs = require('fs');  
const client = new CommandoClient({
    commandPrefix: "A+", //prefix you want example: ++, b!, s!, ^^, etc
    owner: ['243233510758809610'], //your discord-ID goes here
    disableEveryone: true, //disables @everyone
  });

  const path = require('path');
  client.registry
      .registerDefaultTypes()
      .registerGroups([
          ['group1', 'Our First Command Group'],
          ['voice', 'Our Second Command Group']
      ])
      .registerDefaultGroups()
      .registerDefaultCommands()
      .registerCommandsIn(path.join(__dirname, './commands'));
  
  //The arrow is a function
  client.on('ready', () => {
    console.log("bayo is always ready");
  });
  
 
 

client.login()
.then(() =>{console.log(`Connected as: ${client.user.username}`)})
