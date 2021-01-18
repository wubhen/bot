module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!") 
    else {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1);
    
        let cmd = messageArray[0];
    
        if(cmd === "?ban") {
            let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        
            const reason = args[1] || "There was no reason!";
            
            toBan.ban({
                reason: reason
            })
            message.channel.send(`${toBan} has been banned from the server!\nReason: ${reason}`)
            message.user.send(`${toBan} you have been banned from the Doghouse.\nReason: ${reason}`);
        }
    }
}

module.exports.config = {
    name: "ban",
    description: "Bans a Users",
    usage: "?ban",
    accessableby: "Admins",
    aliases: []
}