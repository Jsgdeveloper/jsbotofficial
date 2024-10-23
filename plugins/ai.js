const axios = require('axios');

module.exports = (client, prefixes) => {
    client.on('messageCreate', async (message) => {
        // Mengabaikan pesan dari bot
        if (message.author.bot) return;

        // Mencari prefix
        const prefix = prefixes.find(p => message.content.startsWith(p));

        if (prefix) {
            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.trim().split(/ +/);
            const command = args.shift().toLowerCase();

            // Perintah AI menggunakan widipe.com
            if (command === 'ai') {
                const query = args.join(' ');

                if (!query) {
                    return message.channel.send("Harap masukkan pertanyaan atau pesan untuk AI.");
                }

                try {
                    // Mengirim permintaan ke widipe.com
                    const response = await axios.get(`https://widipe.com/api/ai?query=${encodeURIComponent(query)}`);

                    // Mengambil respons dari AI
                    const aiResponse = response.data.response;

                    if (aiResponse) {
                        await message.channel.send(`🤖 **AI Response:**\n${aiResponse}`);
                    } else {
                        await message.channel.send("AI tidak bisa menjawab pertanyaanmu saat ini.");
                    }
                } catch (error) {
                    console.error("Error saat menghubungi AI:", error);
                    await message.channel.send("Terjadi kesalahan saat mencoba menghubungi AI.");
                }
            }
        }
    });
};
