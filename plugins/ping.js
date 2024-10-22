module.exports = (client, prefixes) => {
    client.on('messageCreate', async (message) => {
        // Mengabaikan pesan dari bot itu sendiri
        if (message.author.bot) return;

        // Mencari prefix
        const prefix = prefixes.find(p => message.content.startsWith(p));
        
        if (prefix) {
            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.trim().split(/ +/); // Memisahkan argumen
            const command = args.shift().toLowerCase(); // Mengambil nama perintah

            // Menangani perintah ping
            if (command === 'ping') {
                const ping = Date.now() - message.createdTimestamp;
                const apiPing = Math.round(client.ws.ping);
                const response = `
                **🏓 Pong!** 
                - **Bot Latency:** \`${ping} ms\`
                - **API Latency:** \`${apiPing} ms\`
                `;
                await message.channel.send(response);
            }

            // Tambahkan perintah lain di sini
        }
    });
};
      
