import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const fireBaseAuth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// export default {
//     fireBaseAuth,
//     googleAuthProvider
// };

