import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";




const firebaseConfig = {
  apiKey: "AIzaSyA0O_UTUKFrIwUaRdTMhNbS3TilpmYDmkI",
  authDomain: "gwitter-f1743.firebaseapp.com",
  projectId: "gwitter-f1743",
  storageBucket: "gwitter-f1743.appspot.com",
  messagingSenderId: "956764618271",
  appId: "1:956764618271:web:68b44185c2c0234d29df2a"
  };

firebase.initializeApp(firebaseConfig); /*init firebase */

/*전체를 export하기 보다는 필요한 서비스만 불러오기 */
export const authService = firebase.auth(); /*export auth service of the official fb*/
export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const storageService = firebase.storage();



