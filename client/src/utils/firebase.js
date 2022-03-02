import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ6vFWraKC7D7gZdClUTUbNWYnxjc3OU8",
  authDomain: "hired-341614.firebaseapp.com",
  projectId: "hired-341614",
  storageBucket: "hired-341614.appspot.com",
//   messagingSenderId: "87673567968",
  appId: "1:87673567968:web:dde4000feeeebc67186e85",
  measurementId: "G-JTZFWYYTV4"
};

// Initialize Firebase
const fireBaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const fireBaseAuth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default {
    fireBaseAuth,
    googleAuthProvider
};

