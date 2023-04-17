import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSGINGSENDEID,
  appId: process.env.REACT_APP_APPID,
};

const firebaseapp = initializeApp(firebaseConfig);
 const firebase = getFirestore(firebaseapp);
 export default firebase;


