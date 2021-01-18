const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle('This is a test Embed.')
        .setURL('https://twitch.tv/ocority')
        .setAuthor('Ocority')
        .setDescription('This is a test Description which we will see.')
        .setColor('#FF2D00')
        .setThumbnail('https://cdn.discordapp.com/attachments/797061979755905026/797206266581745744/8b605365-dc51-4305-8eb9-29194a38a847-profile_image-70x70.png')
        .setImage('https://cdn.discordapp.com/attachments/797061979755905026/797206266581745744/8b605365-dc51-4305-8eb9-29194a38a847-profile_image-70x70.png')
        .setFooter('This is a example footer', 'https://cdn.discordapp.com/attachments/797061979755905026/797206266581745744/8b605365-dc51-4305-8eb9-29194a38a847-profile_image-70x70.png')
        .addFields(
            { name: 'Test Number 1', value: 'This is a example value', inline: true},
            { name: 'Test Number 2', value: 'This is a example value', inline: true},
            { name: 'Test Number 3', value: 'This is a example value'},
            { name: 'Test Number 4', value: 'This is a example value'}
        )
        .setTimestamp()


    message.channel.send(embed);
}

module.exports.config = {
    name: "embed",
    description: "example of an Embed.",
    usage: "?embed",
    accessableby: "Members",
    aliases: []
}