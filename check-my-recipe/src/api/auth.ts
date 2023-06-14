import {
  getAuth,
  connectAuthEmulator,
  signOut as signAuthOut,
  GoogleAuthProvider,
  EmailAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import * as firebaseui from 'firebaseui'

export const auth = getAuth()

let isInitialized = false
onAuthStateChanged(auth, () => { isInitialized = true })

export function isLoggedIn() {
  // the auth state is not resolved immediately.
  // therefore we need to use this construction for when the navigation is through a link or a refresh
  if (isInitialized) return Promise.resolve(!!auth.currentUser)
  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      isInitialized = true
      resolve(!!user)
    })
  })
}

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099')
}

const ui = new firebaseui.auth.AuthUI(auth)
export function signIn(): void {
  ui.start('#firebaseui-auth-container', {
    signInFlow: 'popup',
    signInOptions: [
      // List of OAuth providers supported.
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/',
    // Other config options...
  })
}

export async function signOut(): Promise<void> {
  return await signAuthOut(auth)
}
