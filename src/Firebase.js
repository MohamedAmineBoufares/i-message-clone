import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAelJtJisvpG9DraXc45tQsEaldqwOTMYQ",
    authDomain: "imessage-clone-eaaaf.firebaseapp.com",
    projectId: "imessage-clone-eaaaf",
    storageBucket: "imessage-clone-eaaaf.appspot.com",
    messagingSenderId: "384850610312",
    appId: "1:384850610312:web:db6f25ed7714862931b73d",
    measurementId: "G-TGL3TRWVB9"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;