import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "a10dance-cfcfa.firebaseapp.com",
  projectId: "a10dance-cfcfa",
  storageBucket: "a10dance-cfcfa.appspot.com",
  messagingSenderId: "914700030477",
  appId: "1:914700030477:web:2dc23927524df8cb55fb44",
  measurementId: "G-15RCWXCJZB"
})

  export const auth = firebaseConfig.auth();
  export const storage = firebase.storage;
  export default firebaseConfig;