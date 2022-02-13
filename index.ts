require("dotenv").config();

import DiscordJS, { Intents } from "discord.js";
const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log("The bot is ready");

    // Slash Command (Guild: only for single server)
    const guildId = "715185011229327410";
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        // Add Commands to server
        commands = guild.commands;
    } else {
        // Add Commands to the bot (for all the servers)
        commands = client.application?.commands;
    }

    // Create a 'ping' command
    commands?.create({
        name: "ping",
        description: "replies with pong.",
    });
});

// Reply to the message
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;

    if (commandName === "ping") {
        // Send Reply
        interaction.reply({
            // Message to reply
            content: "pong",

            // Only user sent the command can see
            ephemeral: true,
        });
    }
});

client.login(process.env.TOKEN);
