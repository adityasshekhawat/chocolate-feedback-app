import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCMXux-UQ8tJs0Cjc_cs5Cv7kA8dY5YxkA",
  authDomain: "location-detection-jt.firebaseapp.com",
  projectId: "location-detection-jt",
  storageBucket: "location-detection-jt.firebasestorage.app",
  messagingSenderId: "944485836400",
  appId: "1:944485836400:web:9c50554a72f34b7c8476b5",
  measurementId: "G-8LL4W6D6M8"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

export default app 