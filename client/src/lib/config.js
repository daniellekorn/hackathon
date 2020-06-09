const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB8FHvLgb-QooYpUMNKsZ1lcw4JtrvWD3E",
  authDomain: "shelp-corona.firebaseapp.com",
  databaseURL: "https://shelp-corona.firebaseio.com",
  projectId: "shelp-corona",
  storageBucket: "shelp-corona.appspot.com",
  messagingSenderId: "776285738542",
  appId: "1:776285738542:web:2dcf2bfdf0e4dbadc071bf",
  measurementId: "G-F993RDH5E3",
};

// Initialize Cloud Firestore through Firebase
const fire = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export const googleFire = () => {
  auth.signInWithPopup(provider).then((cred) => {
    return firebase.firestore().collection("users").doc(cred.user.uid).set({
      uid: cred.user.uid,
      userName: cred.user.displayName,
      email: cred.user.email,
      photo: cred.user.photoURL,
    });
  });
};
export default fire;
