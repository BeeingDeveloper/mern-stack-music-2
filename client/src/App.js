import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { useContext, useEffect, useState } from "react";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import { validateUser } from "./api/api";
import { StateContext } from "./context/StateProvider";
import { actionType } from "./context/reducer";
// --------------------------------------------------------------------------




function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const {state, dispatch} = useContext(StateContext);
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );





  // ---------------------------------------------------------------------------
  //CHECK AUTHORIZATION WHEN PAGE LOADS
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          // console.log(token);
          validateUser(token).then((data) => {
            dispatch({ type: actionType.SET_USER, user: data});
          });
        });
        
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({type: actionType.SET_USER, user: null});
        navigate("/login");
      }
    });
  }, []);
  // ---------------------------------------------------------------------------




  return (
    <AnimatePresence mode="wait">
      <div className=" font-kanit min-h-screen bg-slate-900">
        <Navbar />
        <div className="h-auto min-w-[680px] flex justify-center items-center font-kanit">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/signin" element={<SignIn setAuth={setAuth} />} />
          </Routes>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default App;
