import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSGINGSENDEID,
//   appId: process.env.REACT_APP_APPID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyB6CdgXgflYSiIYU3sa5R8VTfVUXvIeyN4",
  authDomain: "cartola-760e9.firebaseapp.com",
  projectId: "cartola-760e9",
  storageBucket: "cartola-760e9.appspot.com",
  messagingSenderId: "312797093927",
  appId: "1:312797093927:web:e5d78eb702ed2666306e02"
};


const firebaseapp = initializeApp(firebaseConfig);
 const firebase = getFirestore(firebaseapp);
 export default firebase;


