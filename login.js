// login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase config (same as register.js)
const firebaseConfig = {
  apiKey: "AIzaSyBW4f1GYYlc9dTeDLQoDPJGi3er40Erm8M",
  authDomain: "capstone-2420.firebaseapp.com",
  projectId: "capstone-2420",
  storageBucket: "capstone-2420.appspot.com",
  messagingSenderId: "361825214112",
  appId: "1:361825214112:web:963091f3fa2946de2073c5",
  measurementId: "G-XMSWMC66H5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "HomePage.html"; // redirect to your dashboard/homepage
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

