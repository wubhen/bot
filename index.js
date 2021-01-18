require('dotenv').config();

const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://wubhen:WarnSystem123@cluster0.6x0wi.mongodb.net/Data',{
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Connected to mongo'))

const bot = new Discord.Client({disableEveryone: true});

require("./util/eventHandler")(bot)

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("message", async message => {
    if (message.content === `?count`) {
        message.channel.send(`Total Members: ${message.guild.memberCount}`);
    } else if (message.content === `?twitch`) {
        message.channel.send('Twitch: https://twitch.tv/ocority')
    } else if (message.content === `?creator`) {
        message.channel.send('Wubhen#0001')
    } else if (message.content === `?hello`) {
        message.channel.send('Hi!')
    } else if (message.content === `?ping`) {
        message.channel.send('Pong!')
    }
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})

bot.on('guildMemberAdd', async(member) => { 

    const Channel = member.guild.channels.cache.get('691082525770121298') 

    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('New Member')
        .setDescription(`<@${member.user.id}> welcome to ${member.guild.name}, we now have ${member.guild.memberCount} members!`)

    Channel.send(embed)

    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'member');

    member.roles.add(welcomeRole)
})

bot.on('guildMemberRemove', async(member) => { 
    
    const Channel = member.guild.channels.cache.get('797825909784707083') 
    
    const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('A member left the server :(')
        .setDescription(`${member.displayName} has left ${member.guild.name}, we now have ${member.guild.memberCount} members!`)
    
    Channel.send(embed)
})

bot.login(process.env.DISCORDJS_BOT_TOKEN);