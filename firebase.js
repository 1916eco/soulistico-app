// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import {getDocs,collection,getFirestore} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsIZgDEz9dGEgIcZCO2zHehUTRqVBpCIM",
  authDomain: "soulistico-c6175.firebaseapp.com",
  projectId: "soulistico-c6175",
  storageBucket: "soulistico-c6175.appspot.com",
  messagingSenderId: "325522414840",
  appId: "1:325522414840:web:d95fe4920774276be76f0d"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = getFirestore(app);
const auth = firebase.auth();

export { db, auth };