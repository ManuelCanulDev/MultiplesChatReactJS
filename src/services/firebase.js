import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyD2Tr_M0xSWKVuJo_6c-gVP9rv6JVV7crQ",
  authDomain: "chatmovil1-51876.firebaseapp.com",
  databaseURL: "https://chatmovil1-51876-default-rtdb.firebaseio.com",
  projectId: "chatmovil1-51876",
  storageBucket: "chatmovil1-51876.appspot.com",
  messagingSenderId: "190045014235",
  appId: "1:190045014235:web:7911e6b1165fcabe2364fe"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
export const dbFirestore = firebase.firestore();

