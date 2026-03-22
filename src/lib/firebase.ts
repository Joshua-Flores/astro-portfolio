import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBwhOUl351nKUeElGelAxl92PvnLqNuyL0',
  authDomain: 'hugo-portfolio-dc921.firebaseapp.com',
  projectId: 'hugo-portfolio-dc921',
  storageBucket: 'hugo-portfolio-dc921.appspot.com',
  messagingSenderId: '41802024899',
  appId: '1:41802024899:web:9a25aa6ebe566b82171f76',
  measurementId: 'G-8PXYH76GC9',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
