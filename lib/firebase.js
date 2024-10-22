const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, child, update, remove } = require('firebase/database');

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKMvTYVmd9t3_BAhuGkqW57umgXAco82c",
  authDomain: "jamasantuy-d22b2.firebaseapp.com",
  databaseURL: "https://jamasantuy-d22b2-default-rtdb.firebaseio.com",
  projectId: "jamasantuy-d22b2",
  storageBucket: "jamasantuy-d22b2.appspot.com",
  messagingSenderId: "734414764994",
  appId: "1:734414764994:web:cde068f7bdde79116e745b",
  measurementId: "G-M1P0CGWNNQ"
};

// Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Menyimpan atau memperbarui data pengguna di Realtime Database.
 * @param {string} userId - ID pengguna Discord.
 * @param {object} userData - Data pengguna yang akan disimpan.
 */
const saveUserData = (userId, userData) => {
    set(ref(database, `users/${userId}`), userData)
        .then(() => {
            console.log(`User data saved successfully for ${userId}`);
        })
        .catch((error) => {
            console.error(`Error saving user data: ${error}`);
        });
};

/**
 * Mengambil data pengguna dari Realtime Database.
 * @param {string} userId - ID pengguna Discord.
 * @returns {Promise<object>} - Data pengguna yang diambil.
 */
const getUserData = (userId) => {
    const dbRef = ref(database);
    return get(child(dbRef, `users/${userId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No user data available');
                return null;
            }
        })
        .catch((error) => {
            console.error(`Error getting user data: ${error}`);
            throw error;
        });
};

/**
 * Mengupdate status klaim harian pengguna.
 * @param {string} userId - ID pengguna Discord.
 * @param {boolean} claimed - Status klaim harian.
 * @param {string} lastClaimed - Waktu klaim terakhir.
 */
const updateDailyClaimStatus = (userId, claimed, lastClaimed) => {
    update(ref(database, `users/${userId}`), { 
        dailyClaimed: claimed, 
        lastClaimed: lastClaimed 
    })
    .then(() => {
        console.log(`Daily claim status updated for ${userId}`);
    })
    .catch((error) => {
        console.error(`Error updating daily claim status: ${error}`);
    });
};

// Ekspor fungsi untuk digunakan di tempat lain
module.exports = {
    saveUserData,
    getUserData,
    updateDailyClaimStatus,
};
                                                     
