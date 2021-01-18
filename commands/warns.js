
const db = require('../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'warns',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission for that chief.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                        )
                    )
                    .setColor("RED")
                )
            } else {
                message.channel.send('User has no data')
            }

        })
    }
}
module.exports.config = {
    name: "warnings",
    description: "Shows the information of a member/user",
    usage: "?warnings",
    accessableby: "Members",
    aliases: []
}