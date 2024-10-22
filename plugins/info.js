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

            // Menangani perintah info
            if (command === 'info') {
                const botInfo = `
                **🤖 Nama Bot:** JsBots
                **👨‍💻 Pembuat:** HendraCoders
                **🔧 Versi:** 1.0.0
                `;

                await message.channel.send(botInfo);
            }
        }
    });
};
