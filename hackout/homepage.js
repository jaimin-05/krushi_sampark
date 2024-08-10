

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCkUXGx0h_s26MI4SWmDhWyIDzRzKDwht0",
    authDomain: "login-form-17fbc.firebaseapp.com",
    projectId: "login-form-17fbc",
    storageBucket: "login-form-17fbc.appspot.com",
    messagingSenderId: "835848481371",
    appId: "1:835848481371:web:93c0aae835f14f47abad7e"
    //YOUR COPIED FIREBASE PART SHOULD BE HERE
    //WATCH THIS VIDEO TO LEARN WHAT TO PUT HERE   https://youtu.be/_Xczf06n6x0
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;

                }
                else {
                    console.log("no document found matching id")
                }
            })
            .catch((error) => {
                console.log("Error getting document");
            })
    }
    else {
        console.log("User Id not Found in Local storage")
    }
})

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
})