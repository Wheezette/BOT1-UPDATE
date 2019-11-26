var Discord = require("discord.js");
var bot = new Discord.Client();
const ascii = require("ascii-art");
const moment = require("moment");
const fs = require("fs");
const ms = require("ms");
const ytdl = require('ytdl-core');
const Canvas = require('canvas');

// ** Wazne zmienne ** //
const kayle = new Discord.Client();
const defaultSettings = require("./Configuration/defaultSettings.json");
const embedColor = require("./Configuration/embedColors.json");
const economyData = JSON.parse(fs.readFileSync("./UserData/economyData.json", "utf8"));
const penaltyData = JSON.parse(fs.readFileSync("./UserData/penaltyData.json", "utf8"));
const penaltiesNum = JSON.parse(fs.readFileSync("./ServerData/penaltiesNum.json", "utf8"));
const userLanguages = JSON.parse(fs.readFileSync("./UserData/userLanguages.json", "utf8"));
const userMessages = JSON.parse(fs.readFileSync("./UserData/userLanguages.json", "utf8"));
const kayleCreator = defaultSettings.botCreatorID;

bot.on("ready", e => {
  setInterval (function (){
    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'K'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Ka'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kay'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayn'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne C'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Co'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Com'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Comm'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Commu'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Commun'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Communi'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Communit'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Community'});

    bot.channels.get(defaultSettings.animationCategory).edit({ name: 'Kayne Community'});

    //bot.channels.get("505809906033754150").edit({ name: 'To już V edycja!'});

  }, 7000);
});

bot.on('ready', () => {
    console.log(`// ** Kayle został włączony ** // \nNazwa #0000: ${bot.user.tag}\nPrefix: ${defaultSettings.botPrefix}`);
    bot.user.setStatus(`dnd`);
    bot.user.setActivity(`twój stary`, {type: "WATCHING"});
});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./Configuration/customPrefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: defaultSettings.botPrefix
        };
    }

    let suggestChannels = JSON.parse(fs.readFileSync("./Configuration/customChannels.json", "utf8"));

    if(!suggestChannels[message.guild.id]){
        suggestChannels[message.guild.id] = {
            suggestChannels: defaultSettings.serverSuggestionsChannel
        };
    }

    let suggestChannel = suggestChannels[message.guild.id].suggestChannels;

// ** Ekonomia w Bocie ** //
    if(!economyData[`${message.author.id}-${message.guild.id}`]) economyData[`${message.author.id}-${message.guild.id}`] = {}
    if(!economyData[`${message.author.id}-${message.guild.id}`].cash) economyData[`${message.author.id}-${message.guild.id}`].cash = 0;
    if(!economyData[`${message.author.id}-${message.guild.id}`].bank) economyData[`${message.author.id}-${message.guild.id}`].bank = 0;
    if(!economyData[`${message.author.id}-${message.guild.id}`].emeralds) economyData[`${message.author.id}-${message.guild.id}`].emeralds = 0;

// ** System kar w Bocie ** //
    if(!penaltyData[`${message.author.id}-${message.guild.id}`]) penaltyData[`${message.author.id}-${message.guild.id}`] = {}
    if(!penaltyData[`${message.author.id}-${message.guild.id}`].warns) penaltyData[`${message.author.id}-${message.guild.id}`].warns = 0;
    if(!penaltyData[`${message.author.id}-${message.guild.id}`].kicks) penaltyData[`${message.author.id}-${message.guild.id}`].kicks = 0;
    if(!penaltyData[`${message.author.id}-${message.guild.id}`].bans) penaltyData[`${message.author.id}-${message.guild.id}`].bans = 0;

// ** Numery kar ** //
    if(!penaltiesNum[`${message.guild.id}`]) penaltiesNum[`${message.guild.id}`] = {}
    if(!penaltiesNum[`${message.guild.id}`].warns) penaltiesNum[`${message.guild.id}`].warns = 0;
    if(!penaltiesNum[`${message.guild.id}`].kicks) penaltiesNum[`${message.guild.id}`].kicks = 0;
    if(!penaltiesNum[`${message.guild.id}`].bans) penaltiesNum[`${message.guild.id}`].bans = 0;

// ** lang **
    if(!userLanguages[`${message.author.id}`]) userLanguages[`${message.author.id}`] = {}
    if(!userLanguages[`${message.author.id}`].lang) userLanguages[`${message.author.id}`].lang = "pl";

// ** userMessages ** //
    if(!userMessages[`${message.author.id}-${message.guild.id}`]) userMessages[`${message.author.id}-${message.guild.id}`] = {}
    if(!userMessages[`${message.author.id}-${message.guild.id}`].messages) userMessages[`${message.author.id}-${message.guild.id}`].messages = 0;

    fs.writeFile("./UserData/penaltyData.json", JSON.stringify(penaltyData), (err) => {
      if (err) console.error(err);
    })

    fs.writeFile("./UserData/economyData.json", JSON.stringify(economyData), (err) => {
      if (err) console.error(err);
    })

    fs.writeFile("./UserData/userLanguages.json", JSON.stringify(userLanguages), (err) => {
      if (err) console.error(err);
    })

    fs.writeFile("./ServerData/userMessages.json", JSON.stringify(userMessages), (err) => {
      if (err) console.error(err);
    })

    const lang = require(`./Translations/${userLanguages[`${message.author.id}`].lang}.json`)

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let msg = message.content.startsWith;
    let args = messageArray.slice(1);

    userMessages[`${message.author.id}-${message.guild.id}`].messages++;

    if(userMessages[`${message.author.id}-${message.guild.id}`].messages === 10){
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      economyData[`${message.author.id}-${message.guild.id}`].cash++;
      message.channel.send("Otrzymujesz 10 monet, ponieważ napisałeś(-aś) 10 wiadomości.")
    }
    if(cmd === `${prefix}test`){
      if(userLanguages[`${message.author.id}`].lang === "en"){
        message.channel.send("en");
      } else if(userLanguages[`${message.author.id}`].lang = "pl"){
        message.channel.send("pl");
      }
    }

    if(cmd === `${prefix}lang`){
      if(!args[0]) return message.channel.send("`PL:` Wybierz język, który chcesz ustawić dla swojego konta.\n`EN:` Choose the language you want to set for your account.\n\n:flag_pl: `Polski` (**100%**) - `" + `${prefix}lang pl` + "`.\n:flag_us: `English` (**99.99%**) - `" + `${prefix}lang en` + "`.\n \n`PL:` Ustawiony język zostanie przypisany do Twojego konta i będzie możliwość zmiany w dowolnej chwili.\n`EN:` The language set will be assigned to your account and you can change it at any time.");
      if(args[0] === "pl") {
        userLanguages[`${message.author.id}`].lang = "pl";
        message.channel.send("Język bota został ustawiony na `Polski` dla Twojego konta.").then(m => m.delete(7000));
        message.delete(7000);
      }
      if(args[0] === "en") {
        userLanguages[`${message.author.id}`].lang = "en";
        message.channel.send("The bot language has been set to `English` for your account.").then(m => m.delete(7000));
        message.delete(7000);
      }
    }

    if(cmd === `${prefix}money`){
      const moneyEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag}`, "https://cdn.discordapp.com/emojis/647802775107010560.png?v=1")
      .setDescription(`
      ${lang.wallet} ${economyData[`${message.author.id}-${message.guild.id}`].cash}
      ${lang.bank} ${economyData[`${message.author.id}-${message.guild.id}`].bank}

      ${lang.emeralds} ${economyData[`${message.author.id}-${message.guild.id}`].emeralds}
      `)
      .setTimestamp()
      message.channel.send(moneyEmbed);
    }

    if(cmd === `${prefix}bingo`){
        let y = Math.floor(Math.random() * (Math.floor(75) - Math.ceil(1) + 1)) + Math.ceil(1);
        let x = null;

        if (y < 15) { x = "B"; }
        else if (y < 30){ x = "I"; }
        else if (y < 45){ x = "N"; }
        else if (y < 60){ x = "G"; }
        else { x = "O"; }

        message.channel.send(x + y);
    }

    if(cmd === `${prefix}kill`){
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        message.channel.send(`**(!)** | **${aUser.tag}** ${lang.wasslain} **${message.author.tag}**!`).then(Message => {
            setTimeout(() => { Message.edit(`**(!)** ${lang.regeneration}`); }, 1000);
            setTimeout(() => { Message.edit(`**(!)** ${lang.bornagain} ${aUser.tag}`); }, 1000);
        });
    }

    if(message.channel.id === "647880097822539776"){
        const hook = new Discord.WebhookClient('648247836416147488', 'eQqmreVclM9GARYQfW-g5SD1gcEF3QqEFTAs-fb4brwfwrY3sbUnVknOp4qLpuqBNGjI');
        hook.send(`\n \n${message.content}\n \n**»** Generated by: \`\ ${message.author.tag} \`\.`);
        message.delete();
    }

    if(cmd === `${prefix}votekick`){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`${lang.noperms} ${lang.requiredperm} \`\ KICK_MEMBERS \`\ .`);
        const agree    = "✅";
        const disagree = "❎";

        if (message.mentions.users.size === 0){
            return message.channel.send(lang.validuser);
        }

        let kickmember = message.guild.member(message.mentions.users.first());

        if(!kickmember){
            message.channel.send(lang.invaliduser);
        }

        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
            return message.reply(`${lang.botnoperm} \`\ KICK_MEMBERS\`\.`).catch(console.error);
        }

        let msg = await message.channel.send(`${lang.votingtokick} **${kickmember}** ${lang.fromserver} ${lang.tovote} (10 ${lang.sec})`);

        await msg.react(agree);
        await msg.react(disagree);

        const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000});

        msg.delete();

        var NO_Count = reactions.get(disagree).count;
        var YES_Count = reactions.get(agree);

        if(YES_Count == undefined){
            var YES_Count = 1;
        }else{
            var YES_Count = reactions.get(agree).count;
        }

        var sumsum = new Discord.RichEmbed()
        .addField(`${lang.votingended}`, `

        ${lang.voteson} ${lang.no}: ${NO_Count-1}
        ${lang.voteson} ${lang.yes}: ${YES_Count-1}

        `)
        .setFooter(`NOTE: ${lang.requiredvotes} 3+`)
        .setColor("f5d018")

        await message.channel.send(sumsum);

        if(YES_Count >= 4 && YES_Count > NO_Count){

            kickmember.kick().then(member => {
                message.reply(`${lang.user} ${member.user.username} ${lang.kicked}`)
        })

        }else{

        message.channel.send(lang.notkicked);

        }
    }

    if(cmd === `${prefix}say`){
        //message.delete();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${lang.requiredperm} \`\ MANAGE_MESSAGES\`\ `)
        let sayMessage = args.join(" ");
        message.delete();
        message.channel.send(sayMessage);
    }

    if(cmd === `${prefix}ascii`){
        ascii.font(args.join(' '), 'Doom', function(rendered) {
          rendered = rendered.trimRight();

          if(rendered.length > 1500) return message.channel.send(lang.messagelong);
          message.channel.send(rendered, {
            code: 'md'
          });
        })
    }

    if(cmd === `${prefix}profile`){
        let aUser = message.mentions.users.first() || message.author;
        const userinfo = new Discord.RichEmbed()
        .setColor("FFA07A")
        .setAuthor(`Profil ${aUser.username}`, `https://cdn.discordapp.com/emojis/472480341299298304.png?v=1`)
        .setThumbnail(aUser.displayAvatarURL)
        .addField("ID:", `${aUser.id}`)
        .addField("Pseudonim:", `${aUser.nickname ? aUser.nickname : "Brak"}`)
        .addField("Konto utworzone:", `${moment.utc(aUser.createdAt).format('dd, Do MM YYYY')}`)
        .addField("Dołączył(-a) do serwea:", `${moment.utc(aUser.joinedAt).format('dd, Do MM YYYY')}`)
        .addField("Jest botem:", `${aUser.bot}`)
        .addField("Status:", `${aUser.presence.status.replace("dnd", "Do Not Disturb")}`)
        .addField("Gra:", `${aUser.presence.game ? aUser.presence.game.name : `${lang.none}`}`)
        .setFooter(`${lang.calledby} ${message.author.tag}.`)
        message.channel.send(userinfo);
    }

    if(cmd === `${prefix}serverinfo`){
      if(!args[0]){
        let serverIcon = message.guild.iconURL;
        let serverInfoEmbed = new Discord.RichEmbed()
        .setColor(embedColor.serverinfo)
        .setAuthor(`${lang.infoaboutserver} ${message.guild.name} ${lang.server}`, serverIcon)
        .setDescription(`
        ${lang.createddate} ${moment.utc(message.guild.createdAt).format('dd, Do MM YYYY')}
        ${lang.joineddate} ${moment.utc(message.author.joinedAt).format('dd, Do MM YYYY')}
        ${lang.susers} ${message.guild.memberCount}
        ${lang.region} ${message.guild.region.replace("eu-central", ":flag_eu: EU Central")}
        ${lang.textchannels} ${message.guild.channels.findAll("type", "text").length}
        ${lang.voicechannels} ${message.guild.channels.findAll("type", "voice").length}
        ${lang.roles} ${message.guild.roles.size}
        ${lang.emojis} ${message.guild.emojis.size}

        :crown: ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}
        `)
        .setFooter(`${lang.calledby} ${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp();
        message.channel.send(serverInfoEmbed);
      }
    }

    if(cmd === `${prefix}channel`){
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${lang.requiredperm} \`\MANAGE_CHANNELS\`\.`);
        let channelname = args.slice(1).join(" ");
        let everyone = message.guild.roles.find(`name`, "@everyone");
        if(args[0] == 'lock') return message.channel.overwritePermissions(everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false }), message.channel.send(lang.channellocked);
        if(args[0] == 'unlock') return message.channel.overwritePermissions(everyone, { SEND_MESSAGES: true, ADD_REACTIONS: true }), message.channel.send(lang.channelunlocked);
        if(args[0] == 'setname') return message.channel.edit({ name: `${channelname}` }), message.channel.send(`**(!)** Nazwa kanału została pomyślnie zmieniona na: ${channelname}`);
        if(!args[0]) return message.channel.send(`**(!)** Poprawne użycie tego polecenia: ` + "`$channel <lock/unlock/setname>`.")
    }

    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }

    if(cmd === `${prefix}eval`){
        if(message.author.id !== kayleCreator) return message.channel.send("**(!)** Nie masz uprawnień do tej komendy.\nWymagane uprawnienia: `root`.")
        if(!args[0]) return message.channel.send("**(!)** Podaj kod źródłowy, aby tego użyć.")
        let result = eval(args.join(" ")).toString()
          let embed = new Discord.RichEmbed()
          //.setTitle("Eval")
          .addField(`:inbox_tray: Wejście`, "```"+args.join(" ")+"```")
          .addField(`:outbox_tray: Wyjście`, "```"+result+"```")
          .setColor("RANDOM")
          .setFooter(`Administrator: ${message.author.tag}`, `https://cdn.discordapp.com/emojis/472480341299298304.png?v=1`)
          message.channel.send(embed);
    }

    if (message.content.startsWith(prefix + "ev")) {
      const arge = message.content.split(" ").slice(1);
      if(message.author.id !== kayleCreator) return;
      try {
        const code = arge.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

          message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``).toString();
      }
    }

    if(cmd === `${prefix}help`){
        const helpmsg = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Moje polecenia')
        .setDescription("Moje komendy są naprawde super, znajdziesz je poniżej!")
        .addField('Standard (3):', '~~`info`~~, `help`, `permissions`')
        .addField('Zabawa (9):', '`ascii`, `reverse`, `choose`, `avatar`, `hug`, `8ball`, `wheel`, `bingo`, `say`, `hug`')
        .addField('Administracja (9):', '`ban`, ~~`kick`~~, `votekick`, `survey`, `addrole`, `removerole`, `channel`, `setprefix`, `setSuggestChannel`, `clear`')
        .addField('Zdjęcia (1):', '`cat`')
        .addField('Informacje (2):', '`server`, `profile`')
        .addField('Inne (1):', '`sugestia`')
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`)
        if(!args[0]) return message.channel.send(helpmsg);
        if(args[0] == 'invite') return message.channel.send('Help with the **INVITE** command. \n```Usage: ' + `${prefix}invite` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'info') return message.channel.send('Help with the **INFO** command. \n```Usage: ' + `${prefix}info` + '``` \n**Aliases:** None \n**Description:** It will display information about the bot.');
        if(args[0] == 'help') return message.channel.send('Help with the **HELP** command. \n```Usage: ' + `${prefix}help` + '``` \n**Aliases:** None \n**Description:** Shows a list of bot commands.');
        if(args[0] == 'serverlist') return message.channel.send('Help with the **SERVERLIST** command. \n~~```Usage: ' + `${prefix}serverlist` + '```~~ \n~~**Aliases:** None \n**Description:** Displays a list of servers on which the bot is located.~~ ' + `\n${bot.emojis.find(`name`, 'alert')} ***__COMMAND DISABLED__*** ${bot.emojis.find(`name`, 'alert')}`);
        if(args[0] == 'permissions') return message.channel.send('Help with the **PERMISSIONS** command. \n```Usage: ' + `${prefix}permissions` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'ascii') return message.channel.send('Help with the **ASCII** command. \n```Usage: ' + `${prefix}ascii <text>` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'reverse') return message.channel.send('Help with the **REVERSE** command. \n```Usage: ' + `${prefix}reverse <text>` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'choose') return message.channel.send('Help with the **CHOOSE** command. \n```Usage: ' + `${prefix}choose <text1>;<text2>` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'avatar') return message.channel.send('Help with the **AVATAR** command. \n```Usage: ' + `${prefix}avatar [<@user>]` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'hug') return message.channel.send('Help with the **HUG** command. \n```Usage: ' + `${prefix}hug <@user>` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
    }

    if(cmd === `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send(":x: Podaj poprawnego użytkownika, musi to być mention.");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(":lock: Nie masz uprawnień do korzystania z tej komendy, jeszcze brakuje Ci `MANAGE_MEMBERS`.");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":lock: Nie możesz go/jej zbanować.");
        if(!args[0]) return message.channel.send(`Ehh... Nie podałeś(aś) powodu bana, niestety, ale musisz go podać.`);

        let banEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`[BAN] ${bUser.tag}`, `${bUser.displayAvatarURL}`)
        .addField("Moderator:", `<@${message.author.id}>, id ${message.author.id}`)
        .addField("Kanał:", message.channel)
        .addField("Powód:", bReason)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto na ${message.guild.name}.`)
        //.setAuthor(`${bUser.user.tag}, ${bUser.id}`, `${bUser.user.displayAvatarURL}`);

        let modlogi = message.guild.channels.find(`name`, "modlogs");
        if(!modlogi) return message.channel.send(`**(!)** Kanał "**modlogi**" nie istnieje, ale to nic nie szkodzi. Użytkownik **${bUser}** został zbanowany(a)`), message.guild.member(bUser).ban(bReason);

        message.channel.send(`**(!)** Użytkownik ${bUser} został zbanowany za ${bReason}.`)
        message.guild.member(bUser).ban(bReason);
        modlogi.send(banEmbed);

        //let logiKomend = bot.channels.get("458569305341296641");
        //logiKomend.send(`Użytkownik: **${message.author.tag}** (**${message.author.id}**) \nUżył komendy **ban** na serwerze **${message.guild.name}**, zbanował **${bUser}** za **${bReason}**.`);
        return;
    }

    if(cmd === `${prefix}serverlist9929319238109310901931039010930190391903`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const guildArray = bot.guilds.map((guild) => {
          return `${guild.name}`
        })

        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Pelna lista serwerow bota:", guildArray.join(", "))
        .setFooter(`There are ${bot.guilds.size} servers in total.`, 'https://cdn.discordapp.com/emojis/472688143389425665.png?v=1')

        message.channel.send(embed);

    }

    if(cmd === `${prefix}serverlist`){
        message.channel.send(`${bot.emojis.find(`name`, 'alert')} ***__Komenda wyłączona__*** ${bot.emojis.find(`name`, 'alert')}`);
    }

    //if(cmd === `${prefix}permissions`){
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        //if (message.author.id === '396284197389729793','358901906170445835') return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień to: `Twórca CookieBOT` (5)");
        //if (message.author.id === '372026600989917195') return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień to: `Globalny Support` (4)")
        //if (message.guild.owner) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Your permission level is: `Server Owner` (3)");
        //if (message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień to: `Administrator Serwera` (2)");
        //if (message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Your permission level is: `Manage Server` (1)");

       // message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień to: `Użytkownik` (0)");
    //}

    if(cmd === `${prefix}removerole`){
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz wymaganych uprawnień. Musisz mieć dodatkowo uprawnienie `MANAGE_MEMBERS`, inaczej komenda nie zadziała.");
        let rMember = message.guild.member(message.mentions.users.first()) ||  message.guild.members.get(args[0]);
        if(!rMember) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Podaj poprawnego użytkownika!`);
        let role = args.join(" ").slice(22);
        if(!role) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Musisz podać rolę do nadania, nie może to być wzmianka!`);
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wybrana rola nie istnieje.`);

        if(!rMember.roles.has(gRole.id)) return message.reply('On nie ma tej roli.');
        await(rMember.removeRole(gRole.id));

        try{
            await rMember.send(`**(!)** Straciłeś(aś) rolę **${gRole.name}** na serwerze **${message.guild.name}**!`)
            await message.channel.send(`**(!)** Usunąłeś(aś) rolę **${gRole.name}** dla użytkownika **<@${rMember.id}>**!`);
        }catch(error){
            console.log(error);
        }
    }

    if(cmd === `${prefix}addrole`){
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz wymaganych uprawnień. Musisz mieć dodatkowo uprawnienie `MANAGE_MEMBERS`, inaczej komenda nie zadziała.");
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Musisz podać poprawnego użytkownika!`);
        let role = args.join(" ").slice(22);
        //message.channel.send(`${bot.emojis.find(`name`, 'error')} You must provide a role (give its name, it can not be a mention)`);
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wybrana rola nie istnieje!.`);

        if(rMember.roles.has(gRole.id)) return;
        await(rMember.addRole(gRole.id));

        try{
            rMember.send(`${bot.emojis.find(`name`, 'alert')} Otrzymałeś(aś) rolę **${gRole.name}** na serwerze **${message.guild.name}**!`)
            message.channel.send(`${bot.emojis.find(`name`, 'success')} Nadałeś(aś) rolę **${gRole.name}** dla użytkownika **<@${rMember.id}>**!`)
        }catch(error){
            console.log(error);
        }
    }

    if(cmd === `${prefix}avatar`){
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        let avEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        //.setDescription(`Avatar ${aUser.username}:`)
        //.setThumbnail(aUser.displayAvatarURL)
        .setDescription(`Avatar ${aUser.username}:`)
        .setImage(aUser.displayAvatarURL)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`);
        message.channel.send(avEmbed);
        return;
    }

    if(cmd === `${prefix}hug`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        let huglinks = ["https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif", "https://media.giphy.com/media/xT39CXg70nNS0MFNLy/giphy.gif", "https://media.giphy.com/media/143v0Z4767T15e/giphy.gif", "https://media.giphy.com/media/BVRoqYseaRdn2/giphy.gif", "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif"];
        let math = Math.floor((Math.random() * huglinks.length));
        let hugEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Użytkownik ${message.author.tag} przytulił(a) ${aUser.tag}.`, 'https://cdn.discordapp.com/emojis/472468044871106591.png?v=1')
        .setImage(huglinks[math])

        if(!args[0]) return message.channel.send(`**(!)** Kogo chcesz przytulić?`);
        message.channel.send(hugEmbed);
    }

    if(cmd === `${prefix}survey` || cmd === `${prefix}vote`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":lock: You do not have sufficient permissions to create a survey.");
        const ankietaMessage = args.join(" ");
        //let ankieta = await message.channel.send(ankietaEmbed);
        let ankietaEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Nowa ankieta`, `https://cdn.discordapp.com/emojis/472694503229358080.png?v=1`)
        .setDescription(ankietaMessage)
        .setFooter(`Ankieta stworzona przez ${message.author.tag}`);

        let ankieta = await message.channel.send(ankietaEmbed);
        ankieta.react(bot.emojis.find(`name`, 'success'));
        ankieta.react(bot.emojis.find(`name`, 'error'));
        message.delete();
        return;
    }

    if(cmd === `${prefix}reverse`){
        if(!args[0]) return message.channel.send(':x: Musisz podać tekst do odwrócenia!');
        if (args[0].includes('enoyreve@')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Eh.. Nie oznaczysz wszystkich przez tą komendę.`);
        if (args[0].includes('ereh@')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Eh.. Nie oznaczysz wszystkich przez tą komendę.`);

        function reverseString(str) {
            return str.split("").reverse().join("");
        }
        let sreverse = reverseString(args.join(' '))
        //if(sreverse === '@here' || sreverse === '@everyone' || sreverse === `https://discord.gg/${invite.code}`) return message.channel.send("Nie możesz tego odwrócić!")
        if(args[0] === sreverse) {
        sreverse = `${args.join(' ')} [wyszło na to samo ;(]`
        }
        message.channel.send(`**(!)** Odwrócony tekst: **${sreverse}**`);
    }

    if(cmd === `${prefix}cat`){
        let catlinks = ["https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif", "https://media.giphy.com/media/l1J3pT7PfLgSRMnFC/giphy.gif", "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif", "https://media.giphy.com/media/6uMqzcbWRhoT6/giphy.gif", "https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif", "https://media.giphy.com/media/11s7Ke7jcNxCHS/giphy.gif", "https://media.giphy.com/media/Nm8ZPAGOwZUQM/giphy.gif", "https://media.giphy.com/media/Q56ZI04r6CakM/giphy.gif"];
        let math = Math.floor((Math.random() * catlinks.length));
        let catEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(`Randomowy kot`, `Tu jest jeden z moich kotków:`)
        .setImage(catlinks[math])
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | ${message.author.tag}`);

        message.channel.send(catEmbed);
    }

    if(cmd === `${prefix}wheel`){
        let arrows = [":arrow_up:", ":arrow_down:", ":arrow_left:", ":arrow_down:"]
        let math = Math.floor((Math.random() * arrows.length));
        const embed = new Discord.RichEmbed()
        .setDescription(`:cookie:    :banana:     :peach:\n \n:ice_cream:    ${arrows[math]}   :tomato:\n \n:tangerine:     :cherries:     :grapes:`)
        message.channel.send(embed);
    }

    if(cmd === `${prefix}8ball`){
        //if(!args[2]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Please, give me the full question!`);
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Ahh... You did not give a question, can I know why?`);
        let replies = ["Tak, oczywiście.", "Przepraszam, ale nie.", "Skąd mam to wiedzieć, lol?", "Możesz zapytać później?", "Mmmmm... NIE."];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");

        let ballembed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setColor("RANDOM")
        .setDescription(question)
        //.addField("Pytanie", question)
        .addField("Odpowiedź:", replies[result])
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | ${message.author.tag}`);

        message.channel.send(ballembed);
        return;
    }

    if(cmd === `${prefix}profilei23289239829832983`){
        let aUser = message.mentions.users.first() || message.author;
        const profileEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(`${bot.emojis.find(`name`, 'user')} ${aUser.username}'s profile`, `Username: ${aUser.username} \nDiscriminator: ${aUser.discriminator} \nGlobal points: 0 \nServer points: 0`)
        message.channel.send(profileEmbed);
    }


    if(cmd === `${prefix}choose`){
        var odp = Math.floor(Math.random() *2) + 1
        var a = args.join(" ").split(";")[0]
        var b = args.join(" ").split(";")[1]
        var odp2
        switch(odp) {
          case 1:
          odp2 = a;
          break;

          case 2:
          odp2 = b;
        }
        let messagechoose = await message.channel.send(`${bot.emojis.find(`name`, 'thinke')} Hmm...`)
        messagechoose.edit(`${bot.emojis.find(`name`, 'chat')} Okej, wybieram: **${odp2}**`)
    }

    if(cmd === `${prefix}clear`){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Woah... Nie masz uprawnień. Dodatkowo wymagane jest uprawnienie `MANAGE_MESSAGES`, bo inaczej komenda nie zadziała.");

        let messagecount = parseInt(args.join(' '));
        message.channel.fetchMessages({
          limit: messagecount
        }).then(messages => message.channel.bulkDelete(messages));
        let purgeSuccessMessage = await message.channel.send(`${bot.emojis.find(`name`, 'success')} Tak jest! Wyczyszczono **${messagecount}** wiadomości z tego kanału!`);
        purgeSuccessMessage.delete(10000);
    }

	if(message.content.startsWith(`<@${bot.user.id}>`)){
		message.channel.send("Cześć! W czym mogę pomóc?\nJeśli chodzi o prefix, to proszę: `" + prefix + "`. Oto on.");
	}

    if(cmd === `${prefix}ping`){
        const m = await message.channel.send("Ping :ping_pong: ");
        m.edit(`:ping_pong: Pong! ${m.createdTimestamp - message.createdTimestamp}ms. API is ${Math.round(bot.ping)}ms`);
    }

    if(cmd === `${prefix}setprefix`){
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz do tego uprawnień. Aby zmienić konfigurację serwera wymagamy dodatkowo uprawnienia `MANAGE_SERVER`, inaczej komenda nie zadziała.");
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wystąpił błąd... Nie podałeś(aś) wartości do ustawienia.`);

        let prefixes = JSON.parse(fs.readFileSync("./Configuration/customPrefixes.json", "utf8"));

        prefixes[message.guild.id] = {
            prefixes: args[0]
        }

        fs.writeFile("./Configuration/customPrefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.error(err);
        });

        let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle('ZAPISANO')
        .setDescription(`Prefiks serwera został ustawiony na: ${args[0]}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Zmieniono przez ${message.author.tag}.`)

        //message.channel.send(sEmbed);
		message.channel.send("Prefiks bota dla tego serwera został zmieniony na: `" + args[0] + "`.\nW razie zapomnienia, oznacz bota.");
    }

    if(cmd === `${prefix}setSuggestChannel`){
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz do tego uprawnień. Aby zmienić konfigurację musisz dodatkowo miec uprawnienie `MANAGE_SERVER`, inaczej komenda nie zadziała.");
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'lock')} Wystąpił błąd... Czyżbyś nie podał(a) wartości, jaką chcesz ustawić?`);

        let sChannelName = message.guild.channels.find(`name`, args.join(" "));
        if(!sChannelName) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wybrany kanał nie istnieje. Podaj poprawny, nie może być to wzmianka kanału.`);

        let suggestChannels = JSON.parse(fs.readFileSync("./suggestChannels.json", "utf8"));

        suggestChannels[message.guild.id] = {
            suggestChannels: args[0]
        }

        fs.writeFile("./suggestChannels.json", JSON.stringify(suggestChannels), (err) => {
            if (err) console.error(err);
        });

        let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle('ZAPISANO')
        .setDescription(`Kanał sugestii został ustawiony na: ${args[0]}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Zmieniono przez ${message.author.tag}.`)

        message.channel.send(sEmbed);
    }

    if(cmd === `${prefix}settings`){
        if(!args[0]) return message.channel.send("```List of settings for the server: \n[1] prefix \n[2] suggestChannel```" + `If you want to set, enter ` + "`" + `${prefix}settings <->` + "`.")
    }

   // if(cmd === `${prefix}sugestia` || cmd === `${prefix}propozycja`){
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        //let suggestContent = args.join(" ");
        //if(!args[0]) return message.channel.send(`**(!)** Musisz podać treść propozycji, inaczej nie przejdzie.`);
        //const suggestEmbed = new Discord.RichEmbed()
        //.setColor("9f59d9")
        //.setAuthor("[SUGESTIA]")
        //.addField("Treść:", suggestContent)
      //  .setDescription(suggestContent)
      //  .setFooter(`Sugestia wysłana przez ${message.author.tag}.`);
        //message.guild.channels.find(`name`, `${suggestChannel}`).send(suggestEmbed);
       // let propozycja = await message.guild.channels.find(`name`, `${suggestChannel}`).send(suggestEmbed);
        //propozycja.react("heavy_check_mark");
        //propozycja.react("x");
        //message.channel.send(`**(!)** Twoja propozycja została pomyślnie wysłana.`)
    //}

    if(message.author.id === "396284197389729793"){
        if(cmd === `${prefix}rich`){
          //if(message.author.id !== "396284197389729as93") return message.channel.send("Nie tego!");
        let stream = args.slice(1).join(" ");
        let game = args.slice(1).join(" ");
        let listen = args.slice(1).join(" ");
        let watch = args.slice(1).join(" ");
        let reset = args.slice(1).join(" ");
          if(!args[0]) return message.channel.send('Musisz podać wartość! Poprawne użycie: `?rich <game/stream/watch/listen> <text>`');
          if(args[0] == 'game') return bot.user.setActivity(game),  message.channel.send(`**(!)** Bot zaczął grać w **${game}**.`);
            //message.channel.send(`:wink: Bot zaczął grać w **${game}**.`);
        //let stream = args.slice(1).join(" ");
          if(args[0] == 'stream') return bot.user.setGame(`${stream}`, {type: 'STREAMING'}), message.channel.send(`**(!)** Bot zaczął streamować **${stream}**.`);
            //message.channel.send(`:wink: Bot zaczął nadawać na żywo **${stream}**.`);
          if(args[0] == 'listen') return bot.user.setActivity(`${listen}`, {type: 'LISTENING'}), message.channel.send(`**(!)** Bot zaczął słuchać **${listen}**.`);
          if(args[0] == 'watch') return bot.user.setActivity(`${watch}`, {type: 'WATCHING'}), message.channel.send(`**(!)** Bot zaczął oglądać **${watch}**.`);
          if(args[0] == 'reset') return bot.user.setActivity(`${reset}`), message.channel.send(`**(!)** Status bota został zresetowany.`);
          if(args[0] == 'servers') return bot.user.setActivity(`${bot.guilds.size} serwerów`), message.channel.send(`**(!)** Status bota został ustawiony na ilość serwerów.`);
        }
    }

    if(cmd === `${prefix}sugestia` || cmd === `${prefix}propozycja`){
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let suggestContent = args.join(" ");
        //if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Co chcesz zaproponować? Podaj treść propozycji.`)
        if(!args[0]) return message.channel.send(`**(!)** Musisz podać treść propozycji, inaczej nie przejdzie.`)
        const suggestEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        //.setColor("9f59d9")
        .setDescription(suggestContent)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Propozycja napisana przez ${message.author.tag}.`);
        //message.guild.channels.find(`name`, `${suggestChannel}`).send(suggestEmbed);
        let propozycja = await message.guild.channels.find(`name`, `${suggestChannel}`).send(suggestEmbed);
        propozycja.react("thumbsup");
        propozycja.react("thumbsdown");
        message.channel.send(`Twoja propozycja została wysłana na kanał <#638789361512480768>. Gracze mogą oddać swój głos poprzez kliknięcie odpowiedniej dla nich reakcji.`)
    }

    if(cmd === `${prefix}ticket`){
        let everyone = message.guild.roles.find(`name`, "@everyone");
        let ticketCreator = message.guild.members.find(`id`, `${message.author.id}`)
        let helpText = args.join(" ");
        let newTicketChannel = await message.guild.createChannel(`pomoc-${message.author.username}`);
        let ticketEmbed = new Discord.RichEmbed()
        .addField('Prośba o pomoc', `**STWORZONE PRZEZ:** ${message.author.tag} \n**TRESC ZGLOSZENIA:** ${helpText}`)
        .addField(`Uwaga!`, 'Po zakończeniu, użytkownik oczekujący na pomoc lub administrator rozpatrujący mogą usunąć ten kanał poprzez komendę ?close.')
        let tChanelSend = await newTicketChannel.send(ticketEmbed);
        //let reactChannel = await tChanelSend.react(bot.emojis.find(`name`, 'success')).then(em => { message.channel.send('Gotowe!') });
        newTicketChannel.overwritePermissions(everyone, { SEND_MESSAGES: false, READ_MESSAGES: false });
        newTicketChannel.overwritePermissions(ticketCreator, { SEND_MESSAGES: true, READ_MESSAGES: true })
        message.channel.send(`Twoja prośba o pomoc jest gotowa, poczekaj na odpowiedź od administracji na kanale **${newTicketChannel}** `);
    }

    if(cmd === `${prefix}penalties`){
      let historyEmbed = new Discord.RichEmbed()
      .setAuthor("User penalties")
      .setDescription(`Warns: ${penaltyData[`${message.author.id}-${message.guild.id}`].warns}\nKicks: ${penaltyData[`${message.author.id}-${message.guild.id}`].kicks}\nBans: ${penaltyData[`${message.author.id}-${message.guild.id}`].bans}`)
      message.channel.send(historyEmbed);
    }

    if(cmd === `${prefix}warn`){
        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${lang.requiredperm} \`\MANAGE_MEMBERS\`\.`).then(m => m.delete(7000)), message.delete(7000);
        //if (args[0] == `${message.author.bot}`) return;
        //if (args[0] == `${message.author}`) return message.channel.send(`${bot.emojis.find(`name`, 'error')} You can not give yourself a warn!`)
        let wUser = message.mentions.users.first();
        if (!wUser) return message.channel.send(lang.validuser).then(m => m.delete(7000)), message.delete(7000);
        const reason = args.join(" ").slice(22);

        penaltyData[`${message.author.id}-${message.guild.id}`].warns++;
        penaltiesNum[`${message.guild.id}`].warns++;

        const warnEmbed = new Discord.RichEmbed()
        //.setDescription("WARN")
        .setAuthor(`[WARN #${penaltiesNum[`${message.guild.id}`].warns}] ${wUser.tag}`, wUser.displayAvatarURL)
        .setColor("#9b0090")
        //.addField("Warned user:", `${wUser}`)
        .addField("Channel:", message.channel)
        //.addField("O godzinie", moment(message.createdAt).format("YYYY.MM.DD, HH:mm:ss"))
        .addField("Number of warnings:", penaltyData[`${wUser.id}-${message.guild.id}`].warns)
        .addField("Moderator:", message.author.tag)
        .addField("Reason:", `${reason}` || "brak")
        .setFooter(`Warned on ${message.guild.name}.`)
        .setTimestamp()

        const warnrecnoreason = new Discord.RichEmbed()
        .setColor("5ae266")
        .setDescription(`${lang.user} ${wUser.tag} ${lang.warningreceivedd}\n${lang.hasnow} ${penaltyData[`${wUser.id}-${message.guild.id}`].warns}${lang.ofthem}.`)
        const warnrec = new Discord.RichEmbed()
        .setColor("5ae266")
        .setDescription(`${lang.user} ${wUser.tag} ${lang.warningreceived} ${reason}.\n${lang.hasnow} ${penaltyData[`${wUser.id}-${message.guild.id}`].warns}${lang.ofthem}.`)
        const warnrecban = new Discord.RichEmbed()
        .setColor("ec7575")
        .setDescription(`${lang.user} ${wUser.tag} ${lang.warningreceived} ${reason}...\n${lang.hasnow} ***__15__***${lang.ofthem}, ***__${lang.wasbanned}__***`)
        if(penaltyData[`${wUser.id}-${message.guild.id}`].warns === 15) return message.channel.send(warnrecban);
        if(!reason) return message.channel.send(warnrecnoreason).then(m => m.delete(15000)), message.delete(15000);
        message.channel.send(warnrec).then(m => m.delete(15000));
        message.delete(15000);
        //message.channel.send(`${lang.user} ${wUser.tag} ${lang.warningreceived}`)
        const warnchannel = message.guild.channels.find("name", "modlogs");
        if (!warnchannel) return;
        warnchannel.send(warnEmbed);
    };

    if(cmd === `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send(":x: Podaj poprawnego użytkownika, musi to być mention.");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(":lock: Nie masz uprawnień do korzystania z tej komendy, jeszcze brakuje Ci `MANAGE_MEMBERS`.");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":lock: Nie możesz go/jej zbanować.");
        if(!args[0]) return message.channel.send(`Ehh... Nie podałeś(aś) powodu bana, niestety, ale musisz go podać.`);

        penaltyData[`${message.author.id}-${message.guild.id}`].bans++;

        let banEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`[BAN] ${bUser.tag}`, `${bUser.displayAvatarURL}`)
        .addField("Moderator:", `<@${message.author.id}>, id ${message.author.id}`)
        .addField("Kanał:", message.channel)
        .addField("Powód:", bReason)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto na ${message.guild.name}.`)
        //.setAuthor(`${bUser.user.tag}, ${bUser.id}`, `${bUser.user.displayAvatarURL}`);

        let modlogi = message.guild.channels.find(`name`, "modlogs");
        if(!modlogi) return message.channel.send(`**(!)** Kanał "**modlogi**" nie istnieje, ale to nic nie szkodzi. Użytkownik **${bUser}** został zbanowany(a)`), message.guild.member(bUser).ban(bReason);

        message.channel.send(`**(!)** Użytkownik ${bUser} został zbanowany za ${bReason}.`)
        message.guild.member(bUser).ban(bReason);
        modlogi.send(banEmbed);

        //let logiKomend = bot.channels.get("458569305341296641");
        //logiKomend.send(`Użytkownik: **${message.author.tag}** (**${message.author.id}**) \nUżył komendy **ban** na serwerze **${message.guild.name}**, zbanował **${bUser}** za **${bReason}**.`);
        return;
    }

});

//let everyone = message.guild.roles.find(`name`, "@everyone");
//if(args[0] == 'lock') return message.channel.overwritePermissions(everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false }), message.channel.send(`${bot.emojis.find(`name`, 'success')} Okay, according to your wishes, I blocked this channel! Others can not write here.`);

bot.login("NjQ2MzI3Njc5MDcwNjM0MDA5.XdkShA.Ct7yzPBRTbnhPcvm3odDo4qMF2w");
