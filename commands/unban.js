module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!") 
    else {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1);
    
        let cmd = messageArray[0];
    
        if(cmd === "?unban") {
            let toBan = await bot.users.fetch(args[0])
    
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!") 
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!") 
    
            const reason = args[1] || "There was no reason!";
    
            message.guild.members.unban(toBan, reason)
    
            message.channel.send(`${toBan} has been unbanned from the server!`)
        }
    
    }
}
module.exports.config = {
    name: "unban",
    description: "Bans a Users",
    usage: "?unban",
    accessableby: "Admins",
    aliases: []
}