// register.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW4f1GYYlc9dTeDLQoDPJGi3er40Erm8M",
  authDomain: "capstone-2420.firebaseapp.com",
  projectId: "capstone-2420",
  storageBucket: "capstone-2420.appspot.com",
  messagingSenderId: "361825214112",
  appId: "1:361825214112:web:963091f3fa2946de2073c5",
  measurementId: "G-XMSWMC66H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle registration
const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registered successfully!");
    window.location.href = "LoginPage.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});
