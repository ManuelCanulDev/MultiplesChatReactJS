import {
  auth,
  dbFirestore
} from "../services/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password).then(
    data => {
      console.log(data);
      //if you are here means it is updated successfully
      console.log('Entro a la Coleccion');
      dbFirestore.collection('users')
        .doc(data.uid)
        .set({
          firstName: email,
          uid: data.uid,
          createdAt: new Date(),
          isOnline: true,
          lastView: new Date()
        })
        .then(() => {
          //succeful
          const loggedInUser = {
            firstName: email,
            uid: data.uid,
            lastView: new Date()
          }
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          console.log('ORIGIN: REGISTRO => User logged in successfully...!');
        })
        .catch(error => {
          console.log(error);
        });
    }
  );
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password).then((data) => {
    console.log(data);

    dbFirestore.collection('users')
      .doc(data.uid)
      .update({
        isOnline: true,
        lastView: new Date()
      })
      .then(() => {
        //succeful
        const loggedInUser = {
          firstName: email,
          uid: data.uid,
          lastView: new Date()
        }

        localStorage.setItem('user', JSON.stringify(loggedInUser));
        console.log('ORIGIN: LOGIN => User logged in successfully...!');
      })
      .catch(error => {
        console.log(error);
      });

  }).catch(error => {
    console.log(error);
  });
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithFacebook() {
  const provider = new auth.FacebookAuthProvider();
  return auth().signInWithPopup(provider);
}

export const logout = (uid) => {
  return auth().signOut().then((data) => {

    var userActual = JSON.parse(localStorage.getItem('user'));

      dbFirestore.collection('users')
      .doc(userActual.uid)
      .update({
        isOnline: false,
        lastView: new Date()
      })
      .then(() => {
        localStorage.clear();
      })
      .catch(error => {
        console.log(error);
      });

  }).catch((error) => {
    console.log(error);
  });
}