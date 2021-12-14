const firebaseConfig = {
    apiKey: "AIzaSyABPlkGgtFiQ1WuSN1zmUvnrmG8ir25Ufo",
    authDomain: "listadesupermercado-29507.firebaseapp.com",
    projectId: "listadesupermercado-29507",
    storageBucket: "listadesupermercado-29507.appspot.com",
    messagingSenderId: "122241653903",
    appId: "1:122241653903:web:d6cffb28c84b1ea8c224fa",
    databaseURL: "https://listadesupermercado-29507-default-rtdb.firebaseio.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const database = firebaseApp.database();
