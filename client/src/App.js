import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import Home from './components/Home';
import SignIn from './components/SignIn';
import { useEffect, useState } from 'react';
import {app} from './config/firebase.config';
import { getAuth } from 'firebase/auth';

  

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate( )
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true" );

  //CHECK AUTHORIZATION WHEN PAGE LOADS
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred)=>{
      if(userCred){
        userCred.getIdToken().then((token)=>{
          console.log(token);
        });
      }else{
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);



  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center font-kanit">
      <Routes>
        <Route path='/*' element={<Home /> } />
        <Route path='/signin' element={<SignIn setAuth={setAuth} /> } />
      </Routes>
    </div>
  );
}

export default App;
