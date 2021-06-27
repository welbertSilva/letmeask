import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGIND_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  apiKey: "AIzaSyCTM-68ylI9JkRSxYWAINpgzVYnF8kRS_s",
  authDomain: "letmeask-19904.firebaseapp.com",
  databaseURL: "https://letmeask-19904-default-rtdb.firebaseio.com",
  projectId: "letmeask-19904",
  storageBucket: "letmeask-19904.appspot.com",
  messagingSenderId: "403893033822",
  //appId: "1:403893033822:web:5927ca9c0c596e0b980dcf",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
