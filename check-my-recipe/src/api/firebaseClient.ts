// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { connectFirestoreEmulator, Firestore, initializeFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNasvepjvLBJVH4ELzl37v6ag2WVtaTWo",
  authDomain: "check-my-recipe.firebaseapp.com",
  projectId: "check-my-recipe",
  storageBucket: "check-my-recipe.appspot.com",
  messagingSenderId: "408544859532",
  appId: "1:408544859532:web:877ffd5b4120e702e132a9",
  measurementId: "G-966J7YDS4G"
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
