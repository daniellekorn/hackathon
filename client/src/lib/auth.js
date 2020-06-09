var firebase = require("firebase");
var firebaseui = require("firebaseui");

const auth = firebase.auth();
auth.signInWithEmailAndPassword(email, pass);
auth.createUserWithEmailAndPassword(email, pass);
auth.onAuthStateChanged((firebaseUser) => {});

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
});

// Is there an email link sign-in?
if (ui.isPendingRedirect()) {
  ui.start("#firebaseui-auth-container", uiConfig);
}
// This can also be done via:
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  ui.start("#firebaseui-auth-container", uiConfig);
}

var ui = new firebaseui.auth.AuthUI(firebase.auth());
