const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(['MANAGE_MESSAGES'])) return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(member.hasPermission(['MANAGE_MESSAGES']) && !message.member.hasPermission('MANAGE_MESSAGES')) return;

        let mutedRole = message.guild.roles.cache.get('797828011750588426');
        let verifiedRole = message.guild.roles.cache.get('797061979122171955');
        if(mutedRole) {
            member.roles.remove(mutedRole); 797828011750588426
            member.roles.add(verifiedRole); 797114978532327454
            message.channel.send("User was successfully Unmuted.");
        }
}

module.exports.config = {
    name: "unmute",
    description: "",
    usage: "?unmute",
    accessableby: "Members",
    aliases: []
}