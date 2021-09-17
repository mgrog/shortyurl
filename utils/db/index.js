// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIRESTORE_KEY,
  authDomain: 'shortydb-ede35.firebaseapp.com',
  projectId: 'shortydb-ede35',
  storageBucket: 'shortydb-ede35.appspot.com',
  messagingSenderId: '226993793711',
  appId: '1:226993793711:web:7ed43cdf2f8ee1ab80c25a',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
