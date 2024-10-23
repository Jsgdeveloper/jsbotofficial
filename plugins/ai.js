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
                    const response = await axios.get(`https://widipe.com/openai?text=${encodeURIComponent(query)}`);

                    // Cek apakah responsnya sukses (status 200)
                    if (response.status === 200 && response.data && response.data.response) {
                        const aiResponse = response.data.response;
                        await message.channel.send(`🤖 **AI Response:**\n${aiResponse}`);
                    } else {
                        console.error('Error dalam respons API Widipe:', response);
                        await message.channel.send("Terjadi kesalahan saat AI mencoba menjawab pertanyaanmu.");
                    }
                } catch (error) {
                    console.error("Error saat menghubungi AI:", error);
                    await message.channel.send("Terjadi kesalahan saat mencoba menghubungi AI. Pastikan layanan tersedia.");
                }
            }
        }
    });
};
                    
