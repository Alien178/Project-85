import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyAN6rs_1hjlrS4DAAgsqrQd6Hgea0k9IKU",
  authDomain: "booksanta-5d19d.firebaseapp.com",
  projectId: "booksanta-5d19d",
  storageBucket: "booksanta-5d19d.appspot.com",
  messagingSenderId: "511820192154",
  appId: "1:511820192154:web:208482cbd643f1d72c4223",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
