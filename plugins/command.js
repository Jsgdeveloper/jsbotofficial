const { exec } = require('child_process'); // Menggunakan child_process untuk menjalankan perintah shell
const { adminId } = require('../config'); // Ambil ID admin dari config.js

module.exports = (client, prefixes) => {
    client.on('messageCreate', async (message) => {
        // Mengabaikan pesan dari bot dan bukan admin
        if (message.author.bot || message.author.id !== adminId) return;

        // Mencari prefix
        const prefix = prefixes.find(p => message.content.startsWith(p));
        
        if (prefix) {
            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.trim().split(/ +/);
            const command = args.shift().toLowerCase();

            // Perintah untuk menginstal npm
            if (command === 'install') {
                const packageName = args[0];
                
                if (!packageName) {
                    return message.channel.send("Silakan sebutkan nama paket yang ingin diinstal.");
                }

                exec(`npm install ${packageName}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${error.message}`);
                        return message.channel.send(`Terjadi kesalahan saat menginstal paket: \`${packageName}\`. Kesalahan: ${error.message}`);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return message.channel.send(`Kesalahan saat menginstal paket: \`${packageName}\`.`);
                    }
                    message.channel.send(`Paket \`${packageName}\` berhasil diinstal!\n\`\`\`${stdout}\`\`\``);
                });
            }
        }
    });
};
                                                    
