const { exec } = require('child_process');
const { adminId } = require('../config'); // Ambil ID admin dari config.js

module.exports = {
    name: 'install',
    description: 'Install NPM packages (Admin only)',
    
    async execute(message, args) {
        // Cek apakah pengirim adalah admin
        if (message.author.id !== adminId) {
            return message.reply('You do not have permission to use this command.');
        }

        // Gabungkan argumen untuk perintah npm (misalnya: "install express")
        const npmCommand = `npm ${args.join(' ')}`;
        
        // Kirim pesan konfirmasi bahwa proses install dimulai
        message.channel.send(`Running command: \`${npmCommand}\``);

        // Eksekusi perintah NPM
        exec(npmCommand, (error, stdout, stderr) => {
            // Kirim log jika terjadi error
            if (error) {
                console.error(`Error: ${error.message}`);
                return message.channel.send(`Error: ${error.message}`);
            }
            // Kirim log jika ada stderr
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return message.channel.send(`Stderr: ${stderr}`);
            }

            // Kirim hasil stdout ke Discord
            message.channel.send(`Command executed successfully:\n\`\`\`${stdout}\`\`\``);
        });
    },
};
