$('#accountLink').on('click', (evt) => {

    //Si no esta logueado, abre el modal

    if(!localStorage.getItem('id')){
    evt.preventDefault();
    $('.modal').fadeIn();}
  })


changeToSignUp.addEventListener('click', (evt) => {
    evt.preventDefault();
    $('#signUpForm').toggle()
    $('#signInForm').toggle()
})

document.querySelector('#closeIcon').addEventListener('click', () => $('.modal').fadeOut())

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js"
import { getFirestore, addDoc, collection, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_6nr4sCcAr0u7AnUZwKCy5Pn12k3HJ7c",
  authDomain: "js-exchange.firebaseapp.com",
  projectId: "js-exchange",
  storageBucket: "js-exchange.appspot.com",
  messagingSenderId: "886027376912",
  appId: "1:886027376912:web:2976d2277da6a5c25bad95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const signInForm = document.querySelector('#signInForm');
const signUpForm = document.querySelector('#signUpForm');
const logout = document.querySelector('#logout')

//Baja info de BBDD

async function getUserInfo(db, id){
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersData = await usersSnapshot.docs.map(doc => doc.data())
    const userData = await usersData.find(user => user.id === id)
    return userData; 
}

//Guarda info en BBDD

async function sincronizar(callback){
    const uid = localStorage.getItem('id')
    const localNombre = localStorage.getItem('nombre')
    const localFunds = localStorage.getItem('funds')
    const localOper = JSON.parse(localStorage.getItem('operaciones'))
    console.log(localOper)

    await setDoc(doc(db, 'users', uid), {
        id : uid,
        nombre : localNombre,
        funds : localFunds,
        operaciones: localOper
    })
    callback();   
}

// SignOut function

async function signOut(){
    await getAuth().signOut().then(()=>console.log('sign out'))
    localStorage.clear()
    reload();
}

function reload(){
    document.querySelector('.navbar-brand').click()
}


//Login
signInForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const email = document.querySelector('#inputEmail').value
    const password = document.querySelector('#inputPassword').value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        getUserInfo(db, user.uid)
        .then(user => {
            for(let index in user){
               localStorage.setItem(index, user[index])
            }
            localStorage.setItem('operaciones', JSON.stringify(user.operaciones))
            })

            $('.modal').fadeOut()
            
    })
    .catch(err => {
        console.error(err)
        $('#signInError').text(err.message)
        $('#signInError').show()
    })
})

//Registrarse
signUpForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const registerEmail = document.querySelector('#registerEmail').value
    const registerPassword = document.querySelector('#registerPassword').value
    const registerNombre = document.querySelector('#registerNombre').value

    console.log(registerEmail, registerPassword);

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then(userCredential => {
            console.log('sign up');
            const uid = userCredential.user.uid
            setDoc(doc(db, 'users', uid), {
                id : uid,
                nombre : registerNombre,
                funds : 0,
                operaciones: []
            }
            )
            getAuth().signOut().then(()=>console.log('sign out'))
            $('#signUpForm').toggle()
            $('#signInForm').toggle()
            $('#alertWrapper').html(`
            <div class="alert alert-success" role="alert">
                Gracias por registrarte! Inicia sesión para continuar.
            </div>`)
        })
        .catch((err) => {
            $('#signUpError').text(err.message)
            $('#signUpError').show()

            })
})

//Logout event
logout.addEventListener('click', (evt) =>{
    evt.preventDefault()
    sincronizar(signOut)
})

