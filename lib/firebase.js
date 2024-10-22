const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, set, update } = require('firebase/database');

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fungsi untuk mendapatkan data user dari Firebase
async function getUserData(userId) {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null; // Jika data belum ada
    }
}

// Fungsi untuk menyimpan atau mengupdate data user di Firebase
async function saveUserData(userId, data) {
    const userRef = ref(database, `users/${userId}`);
    await set(userRef, data);
}

// Fungsi untuk update data user secara parsial
async function updateUserData(userId, data) {
    const userRef = ref(database, `users/${userId}`);
    await update(userRef, data);
}

module.exports = { getUserData, saveUserData, updateUserData };
                  
