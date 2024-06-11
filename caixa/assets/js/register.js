  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDzvVWVOVcJ0qevAqwDzSnT-Smwf74EVyU",
    authDomain: "caixa-f89aa.firebaseapp.com",
    projectId: "caixa-f89aa",
    storageBucket: "caixa-f89aa.appspot.com",
    messagingSenderId: "913843692581",
    appId: "1:913843692581:web:c527f5fcdebb9c7a634bcc",
    measurementId: "G-R5X4EQMW6M"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const submit = document.getElementById('submit').value;
  submit.addEventListener("click", function (event){
    event.preventDefault()

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    const user = userCredential.user;
    alert("criando conta")

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("erro")

  });

  })