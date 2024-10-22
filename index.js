const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
const config = require('./config');

// Inisialisasi express
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Menjalankan server web
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Inisialisasi client Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Memuat semua plugin dari folder 'plugins'
const loadPlugins = (client) => {
    const pluginsPath = path.join(__dirname, 'plugins');
    fs.readdirSync(pluginsPath).forEach(file => {
        if (file.endsWith('.js')) {
            const plugin = require(path.join(pluginsPath, file));
            plugin(client, config.prefixes); // Meneruskan client dan prefix ke plugin
        }
    });
};

// Event ketika bot siap
client.once('ready', () => {
    console.log(`${config.botName} is online!`);
    loadPlugins(client); // Memuat plugin saat bot online
});

// Login menggunakan token dari environment variable
client.login(process.env.DISCORD_TOKEN);
