import firebase from 'firebase/app'
import 'firebase/auth'

import firebaseConfig from '@fire/firebase.json'

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app() // if already initialized, use that one
  }
}

const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = (cb, newUserCb) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(async (res) => {
          const idToken = await res.user.getIdToken()
          const { isNewUser } = res.additionalUserInfo
          const { displayName, email, refreshToken } = res.user
          cb({
            displayName,
            email,
            refreshToken,
            idToken,
          })
          if (isNewUser) {
            newUserCb({
              name: displayName,
              email,
            })
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export const logOutWithGoogle = () => {
  firebase.auth().signOut()
}

export const checkAuth = (cb) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const idToken = await user.getIdToken()
      const { displayName, email, refreshToken } = user
      cb({
        displayName,
        email,
        refreshToken,
        idToken,
      })
    } else {
      // User is signed out
      // ...
      cb(null)
    }
  })
}
