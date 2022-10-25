import React, { useContext, useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { app } from '../config/firebase.config'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { validateUser } from '../api/api';


const SignIn = ({setAuth}) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const {state, dispatch } = useContext(StateContext);
  console.log("login page: ", state);
  // SIGIN IN WITH GOOGLE FUNCTION==================================
  const loginWithGoogle = async ()=>{
    await signInWithPopup(firebaseAuth, provider).then((userCred)=>{
      if(userCred){
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        
        firebaseAuth.onAuthStateChanged((userCred)=>{
          if(userCred){
            userCred.getIdToken().then((token)=>{
              validateUser(token).then((data)=>{
                dispatch({type: actionType.SET_USER, user: data})
              })
            });
            navigate("/", {replace: true});
          }else{
            setAuth(false);
            dispatch({type: actionType.SET_USER, user: null});
            navigate("/signin");
          }
        })

      }
    })
  }
  //===============================================================




  //IF USER ALREADY LOGGED IN HEAD TO THE HOME PAGE
  useEffect(() => {
    if(window.localStorage.getItem("auth") === "true"){
      navigate("/", {replace: true});
    }
  }, [])
  // ==============================================



  return (
    <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
      <div className='flex items-center justify-center gap-2 p-2 rounded-md bg-cardOverlay hover:bg-card transition-all ease-in-out duration-600 shadow-xl' onClick={loginWithGoogle} >
        <FcGoogle />
        <p>Sign in with Google</p>
      </div>
    </div>
  )
}

export default SignIn