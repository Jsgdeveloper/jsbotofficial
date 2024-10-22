const { getUserData, saveUserData, updateUserData } = require('../lib/firebase');

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

            // Perintah untuk memeriksa saldo pengguna
            if (command === 'balance') {
                const userId = message.author.id;
                const userData = await getUserData(userId);

                if (userData) {
                    const balanceMessage = `
                    **💰 Saldo Uang:** ${userData.money || 0} 💵
                    **🪙 Koin:** ${userData.coins || 0} 🪙
                    `;
                    await message.channel.send(balanceMessage);
                } else {
                    await message.channel.send("Kamu belum memiliki data! Mulai simpan uangmu dengan perintah `!addmoney <jumlah>`.");
                }
            }

            // Perintah untuk menambahkan uang
            if (command === 'addmoney') {
                const userId = message.author.id;
                const amount = parseInt(args[0]);

                if (isNaN(amount) || amount <= 0) {
                    return message.channel.send("Masukkan jumlah uang yang valid.");
                }

                const userData = await getUserData(userId) || { money: 0, coins: 0, banned: false, level: 1 };
                userData.money += amount;

                await saveUserData(userId, userData);
                await message.channel.send(`Berhasil menambahkan **💵 ${amount}** ke saldo kamu! Total saldo sekarang: **💵 ${userData.money}**.`);
            }

            // Perintah untuk menambahkan koin
            if (command === 'addcoin') {
                const userId = message.author.id;
                const amount = parseInt(args[0]);

                if (isNaN(amount) || amount <= 0) {
                    return message.channel.send("Masukkan jumlah koin yang valid.");
                }

                const userData = await getUserData(userId) || { money: 0, coins: 0, banned: false, level: 1 };
                userData.coins += amount;

                await saveUserData(userId, userData);
                await message.channel.send(`Berhasil menambahkan **🪙 ${amount}** koin! Total koin sekarang: **🪙 ${userData.coins}**.`);
            }
        }
    });
};
