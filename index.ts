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

    commands?.create({
        name: "add",
        description: "Adds two numbers.",
        options: [
            {
                name: "num1",
                description: "The first number",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: "num2",
                description: "The second number",
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ],
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
    } else if (commandName === "add") {
        // Get values of options from the command
        const num1 = options.getNumber("num1")!;
        const num2 = options.getNumber("num2")!;

        // Allow bot to take more than default time (3s) to reply
        await interaction.deferReply({
            ephemeral: true,
        });

        // Delay reply 5s (testing)
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Reply
        interaction.reply({
            content: `The sum is ${num1 + num2}`,
            ephemeral: true,
        });
    }
});

client.login(process.env.TOKEN);
