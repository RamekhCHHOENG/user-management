import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDetp_GSGRlV54p5qTha3JQ36Njr_lIRZw",
  authDomain: "user-management-8947f.firebaseapp.com",
  projectId: "user-management-8947f",
  storageBucket: "user-management-8947f.appspot.com",
  messagingSenderId: "132094191034",
  appId: "1:132094191034:web:ae556663101f4ae8616983",
  measurementId: "G-3V1NXKTRM9"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }