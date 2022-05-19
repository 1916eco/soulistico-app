import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import {doc,collection, where,query, getDoc} from 'firebase/firestore';


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);



  useEffect(() => {
    if(user){
      const myDoc = doc(db,"Admins", "Admin");
      getDoc(myDoc).then((doc)=>{
        if(doc.data().uid === user.uid){
          setAdmin(true);
        }else{
          setAdmin(false);
        }
      }).catch((err)=>{
        console.log(err);
      })
    }

  }, [user])
  // Each function is imported from the firebase library and is used by the context provider which is used by the components
  function logIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function logOut() {
    return auth.signOut();
  }
  // function googleSignIn() {
  //   const googleAuthProvider = new GoogleAuthProvider();
  //   return signInWithPopup(auth, googleAuthProvider);
  // }
  // function deleteUserProfile(){
  //   return deleteUser(auth.currentUser)
  // }
  function updateUserProfile(name){
    return auth.currentUser.updateProfile({
      displayName: name
    })
  }
  function resetPassword(email){
    return sendPasswordResetEmail(auth, email)
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentuser) => {
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
      value={{ user,admin,logIn,signUp,logOut,updateUserProfile}}
    >
      {children}
    </userAuthContext.Provider>
  );
}


export function useUserAuth() {
  return useContext(userAuthContext);
}