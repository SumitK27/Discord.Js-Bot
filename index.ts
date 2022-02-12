require("dotenv").config();

import DiscordJS, { Intents } from "discord.js";
const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log("The bot is ready");
});

client.on("messageCreate", (message) => {
    if (message.content === "ping") {
        message.reply({
            content: "Pong!",
        });
    }
});

client.login(process.env.TOKEN);
