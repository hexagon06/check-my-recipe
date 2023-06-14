// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { connectFirestoreEmulator, Firestore, initializeFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiXHIdbtzRQ9hmPi24NsYRU2DryqOufjQ",
  authDomain: "characters-react.firebaseapp.com",
  projectId: "characters-react",
  storageBucket: "characters-react.appspot.com",
  messagingSenderId: "1052637248245",
  appId: "1:1052637248245:web:91fd8c54df8577b383e3bc",
  measurementId: "G-1H87WCVSFN"
};

class FirebaseClient {
  public readonly app: FirebaseApp
  public readonly analytics: Analytics
  public readonly store: Firestore

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.store = initializeFirestore(this.app, {
      ignoreUndefinedProperties: true,
    })
    this.analytics = getAnalytics(this.app)

    if (process.env.NODE_ENV === 'development') {
      connectFirestoreEmulator(this.store, 'localhost', 8080)
    }
  }
}

export const firebaseClient = new FirebaseClient()
