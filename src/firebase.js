
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv5bp47qljeaDYi4-qwMTnC82r5gnY0vk",
  authDomain: "wheels-enchntment.firebaseapp.com",
  projectId: "wheels-enchntment",
  storageBucket: "wheels-enchntment.firebasestorage.app",
  messagingSenderId: "63625337830",
  appId: "1:63625337830:web:1b434cb260502a10ddd427",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);