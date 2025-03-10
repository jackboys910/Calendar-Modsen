import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmxBifrjG_-DETzUV3KM341mIiXvjLEbI',
  authDomain: 'calendarmodsen.firebaseapp.com',
  projectId: 'calendarmodsen',
  storageBucket: 'calendarmodsen.firebasestorage.app',
  messagingSenderId: '471200388609',
  appId: '1:471200388609:web:64bbdd508f914fd55c1200',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
