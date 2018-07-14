const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const youtubeSearch = require("youtube-search");
const ytdl = require('ytdl-core');
const EventEmitter = require('events');
const Utils = require('../../components/Utils');
const musicEmitter = new EventEmitter();

const opts = {
  maxResults: 5,
  key: "AIzaSyA0HXDwXMzZdfY5BRjn6wHMhst9iqyWnUM"
};

const guilds = {};


musicEmitter.on('songComplete', function (guild, connection) {
  if (guild.repeat === true) {
    setTimeout(function () {
      playStream(guild.currentSong, connection, guild);
    }, 1500);
  }
});

musicEmitter.on('skip', function (guild) {
  setTimeout(function () {
    skipSong(guild);
  }, 1000);
});

module.exports = class MusicCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'music',
        group: 'voice',
        memberName: 'music',
        description: 'allows the user to listen to music.',
        examples: ['music'],
        args: [
          {
            key: 'text',
            prompt: 'type A+commands to see the music commands.',
            type: 'string',
          }
        ],
        guildOnly: true,
      });
    }
    run(message, musicArgs) {
      var text = musicArgs.text;
      var args = text.split(" ");
      console.log(args);
      var playBackArgs = args.slice(1);
      var currentGuild = lookupGuild(guilds, message.guild.id);
      if (args[0] === 'q') {
          var contents = playBackArgs.join(" ");
          var info = /([\s\S]*)/ig.exec(contents.trim());
          console.log('PlayBack Info', info);
          if (info !== null && info[1].match('http')) {
              ytdl.getInfo(info[1].trim()).then(function (info) {
                  currentGuild.urlQueue.push({
                      url: info.video_url,
                      user: message.author,
                      title: info.title,
                  });
                  message.say(Utils.removeLineBreak("Added: `" + info.title + "` to queue \n          requested by `" + message.author.username + "` at position: \n          `" + currentGuild.urlQueue.length + "`. :musical_note:"));
              }).catch(console.error);
              return message.say('Adding video to queue...');
          }
          else if (info !== null && currentGuild.searchResults.length > 0
              && /\d+/.test(info[1].trim())) {
              var video = currentGuild.searchResults[parseInt(info[1]) - 1];
              currentGuild.urlQueue.push({
                  url: video.link,
                  user: message.author,
                  title: video.title,
              });
              currentGuild.searchResults.length = 0;
              return message.say(Utils.removeLineBreak("Added: `" + video.title + "` to queue requested by \n        `" + message.author.username + "` at position: \n        `" + currentGuild.urlQueue.length + "`. :musical_note:"));
          }
          else if (info !== null) {
              youtubeSearch(contents, opts, function (err, results) {
                  if (err)
                      return console.log(err);
                  currentGuild.searchResults = results.slice();
                  return message.say(("```css\n" + "\n\n[Music Search]\n\n" + results.reduce(function (finalString, result, index) {
                      finalString += index + 1 + " - " + result.title + "\n\n";
                      return finalString;
                  }, "") + "\n" + "```\n  ").trim());
              });
          }
      }
      if (/play/.test(args[0]) && currentGuild.urlQueue.length > 0) {
          var song = currentGuild.urlQueue.shift();
          currentGuild.currentSong = song;
          var savedConnection_1 = null;
          if (this.client.voiceConnections.some(function (connection) {
              var answer = (connection.channel.id === message.member.voiceChannel.id)
                  ? true : false;
              if (answer === true) {
                  savedConnection_1 = connection;
                  currentGuild.savedConnection = savedConnection_1;
              }
              return answer;
          })) {
              try {
                  playStream(song, savedConnection_1, currentGuild);
                  return message.say(Utils.removeLineBreak("Playing: `" + song.title + ".` \n          requested by: `" + song.user.username + "` :musical_note:"));
              }
              catch (err) {
                  console.error(err);
              }
          }
      }
      if (/skip/.test(args[0])) {
          musicEmitter.emit("skip", currentGuild);
          return message.say('Track skipped. :track_next:');
      }
      if (/pause/.test(args[0])) {
          currentGuild.savedConnection.dispatcher.pause();
          setTimeout(function () {
              currentGuild.savedConnection.dispatcher.stream.pause();
          }, 5000);
      }
      if (/resume/.test(args[0])) {
          currentGuild.savedConnection.dispatcher.stream.resume();
          setTimeout(function () {
              currentGuild.savedConnection.dispatcher.resume();
          }, 5000);
      }
      if (/purge/.test(args[0])) {
          currentGuild.urlQueue.length = 0;
          return message.say('Music queue purged. :skull_crossbones:');
      }
      if (/list/.test(args[0])) {
          var songPromises = currentGuild.urlQueue
              .map(function (request) { return ytdl.getInfo(request.url); });
          Promise.all(songPromises).then(function (songs) {
              return message.say(("```css\n" + "\n[Song Queue]\n\n" + songs.reduce(function (initial, song, index) {
                  initial += song.title + " requested by " + currentGuild.urlQueue[index].user.username + "\n\n";
                  return initial;
              }, "") + "\n" + "```").trim());
          });
      }
      if (/repeat/.test(args[0])) {
          currentGuild.repeat = !currentGuild.repeat;
          var text_1 = (currentGuild.repeat === true) ?
              'Set to repeat. :repeat:' : 'Repeat off.';
          return message.say(text_1);
      }
      
      function lookupGuild(guilds, guildId) {
          if (guilds[guildId] === undefined) {
              guilds[guildId] = {
                  repeat: false,
                  guildID: guildId,
                  urlQueue: [],
                  searchResults: [],
                  currentSong: null,
                  savedConnection: null,
              };
          }
          return guilds[guildId];
      }
      function playStream(song, connection, guild) {
          var streamOptions = { seek: 0, volume: 1 };
          if (connection.dispatcher !== null && connection.dispatcher !== undefined) {
              connection.dispatcher.end(" New Stream To Process");
          }
          setTimeout(function () {
              if (song !== undefined) {
                  console.log('Found', song.url);
                  guild.currentSong = song;
                  var stream = ytdl(guild.currentSong.url, { quality: 140, filter: 'audioonly' });
                  var dispatcher = connection.playStream(stream, streamOptions);
                  console.log(dispatcher);
                  stream.on('error', function (error) { console.error('Stream Error', error); });
                  dispatcher.on('error', function (error) {
                      console.error('Dispatcher Error', error);
                  });
                  dispatcher.on('end', function (reason) {
                      console.log('Dispatcher End:', reason);
                      if (/generating/ig.test(reason)) {
                          console.log("On to step 2");
                          musicEmitter.emit("songComplete", guild, connection);
                      }
                  });
              }
          }, 500);
      }
      function skipSong(guild) {
          playStream(guild.urlQueue.shift(), guild.savedConnection, guild);
      }
    }
  } 