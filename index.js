  const url = require('url');
  const path = require('path');
  const fs = require('fs');



  const Discord = require('discord.js');
  const opn = require('opn');
  const bot = new Discord.Client();
  const config = require('./config.json');
  let channelID = config.channelID;
  let botToken = config.botToken;
  let kw = config.keyword;
  var Regex = require("regex");
  require('console-stamp')(console, 'HH:MM:ss.l');


  bot.login(botToken).catch(err => console.log('loginError'))

  bot.on('ready', () => {
  	console.log(bot.user.tag+" Bot is Online");
    console.log("Monitoring Channel ID:"+channelID+"...");
    console.log("Set of keywords from config.json: " +kw);
  });

  bot.on('message', (msg) => {
  try{
  if (msg.channel.id === channelID) {

    let embed = msg.embeds[0], // This is the embed we're searching in.
    field, text, number;
    if (!embed) return; // If there are no embeds in the message, return.

    for (let f of embed.fields) { // Loop through every field in the embed...
      if (f.name == 'Urls In Text') { // ...until you find the one named 'Sizes'
        field = f; // Then store it into the field variable
        
        break; // Exit the loop

      }
    }
    if (!field) return; // If there are no 'Urls In Text' fields, return.
    
     var link = String(field.value);
     //text = field.value.split('-')[1].trim();
     
    //var match = link.includes(kw);

    for (var i = kw.length - 1; i >= 0; --i) {
        if (link.indexOf(kw[i]) != -1) {
          // str contains arr[i]
        var match = link.includes(kw[i]);
           if (match == true) {
            realLink1 = link.split(' ')[0].trim();
            realLink2 = link.split('-')[1];
            if (realLink2 == null) {
              console.log(realLink1);
              console.log("Found a matching keyword: "+kw[i]);
              console.log("Link Founded: " + realLink1);
              opn(realLink1);
              console.log("Opened Link: " + realLink1);
            }
            
            else if (realLink2 !== null)  {
              realLink2split = link.split('-')[1].trim();
              console.log(realLink2split);
              console.log("Found a matching keyword: "+kw[i]);
              console.log("Link Founded: " + realLink2split);
              opn(realLink2split);
              console.log("Opened Link: " + realLink2split);
            }
            
            }
            else{
              console.log("Does not match");
              return;
            } 
      }
    }
  }
  }
  catch(err){
    console.log(err);
  }

  });



  bot.login(botToken);