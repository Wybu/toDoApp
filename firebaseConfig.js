// modules/shared/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';          // Nếu dùng Realtime DB
import { getFirestore } from 'firebase/firestore';        // Nếu dùng Firestore

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "todoapp-f95b3",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  databaseURL: "https://your-project.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

// Dùng cái nào thì export cái đó
const db = getDatabase(app);       // Realtime DB
// const db = getFirestore(app);   // Nếu dùng Firestore

export { db };
