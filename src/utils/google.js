import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbJc_XSvzDEUSTzvv1YG64bvImUcfifWo",
  authDomain: "worldone-88858.firebaseapp.com",
  projectId: "worldone-88858",
  storageBucket: "worldone-88858.appspot.com",
  messagingSenderId: "864659935789",
  appId: "1:864659935789:web:669d2f42ca804934df1ea4"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig)
 
export const auth = getAuth(app);
export default app;