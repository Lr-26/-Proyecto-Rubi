import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC7M-WSd9q0NOdfjfuseyuwOUHLaxrCMAo",
    authDomain: "lentes-carteras-web.firebaseapp.com",
    projectId: "lentes-carteras-web",
    storageBucket: "lentes-carteras-web.firebasestorage.app",
    messagingSenderId: "227873802498",
    appId: "1:227873802498:web:b0b0615aaebcf0bf155a1b",
    measurementId: "G-XRQBCC1DE7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
