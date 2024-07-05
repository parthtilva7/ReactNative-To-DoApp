import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOCcmJtO3_T-gUvotvQBQzaf-SKh5tZMM",
  authDomain: "reactfirebase-e5bf3.firebaseapp.com",
  databaseURL: "https://reactfirebase-e5bf3-default-rtdb.firebaseio.com",
  projectId: "reactfirebase-e5bf3",
  storageBucket: "reactfirebase-e5bf3.appspot.com",
  messagingSenderId: "89851679651",
  appId: "1:89851679651:web:f067c5a83d8ade5f5e0016",
  measurementId: "G-D5455KJMK8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
