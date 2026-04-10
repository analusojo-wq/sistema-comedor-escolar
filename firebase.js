import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyCKj0r2Sl6TcUQ3Sl_yejGICJ1of7DB7xk",

authDomain: "comedor-colegio.firebaseapp.com",

projectId: "comedor-colegio",

storageBucket: "comedor-colegio.firebasestorage.app",

messagingSenderId: "1037359184863",

appId: "1:1037359184863:web:d87957119fd3e9cd94626a",

measurementId: "G-E8BXXC76PP"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };