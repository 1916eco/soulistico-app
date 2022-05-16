import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("enrico");


  // Each function is imported from the firebase library and is used by the context provider which is used by the components
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function deleteUserProfile(){
    return deleteUser(auth.currentUser)
  }
  function updateUserProfile(name){
    return updateProfile(auth.currentUser,{displayName:name})
  }
  function resetPassword(email){
    return sendPasswordResetEmail(auth, email)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      //console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    // The context provider is used by the components to access the functions
    //value={{ user, logIn, signUp, logOut, googleSignIn,deleteUserProfile,updateUserProfile,resetPassword }}
    <userAuthContext.Provider
      value={{ user }}
    >
      {children}
    </userAuthContext.Provider>
  );
}


export function useUserAuth() {
  return useContext(userAuthContext);
}