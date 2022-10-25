import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.png';
import { StateContext } from '../context/StateProvider';
import './style.css'
import { Popover, PopoverTrigger, PopoverContent, Button,} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import PROFILE_ICON from '../assets/img/profile.png';
import { motion } from 'framer-motion';
// -------------------------------------------------------------------------------------------------

const style = {
    divider: {height: '2px', width: '100%', background: '#a3b3cc'},
    popup: {}
}

const Navbar = () => {

    const [activeNav, setActiveNav] = useState("#");
    const {state, dispatch} = useContext(StateContext);
    let name = state.user?.user?.name;
    let imgURL = state.user?.user?.imageURL;

    let firstName = undefined;
    let profileIMG = imgURL? imgURL : PROFILE_ICON;
    
    if(name) firstName = name.split(" ")[0];

    

    const navigate = useNavigate();
    const logOut =()=>{
        console.log("function is calling")
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(()=>{
            window.localStorage.setItem("auth", "false");
            navigate('/', {replace: true});
        }).catch(error=>{
            console.log(error);
            navigate('/signin', {replace: true});
        });
    }



  return (
    <header className=' flex '>
        <div className=' w-10/12 flex justify-between m-auto'>


            <NavLink to='/'>
                <img src={Logo} alt="logo" className='w-12' />
            </NavLink>

            <ul className='flex items-center justify-center ml-7 gap-3'>
                <a href='#home' onClick={()=>setActiveNav('#home')} className={activeNav === "#home" ? 'active' : ''} >
                    <NavLink to={'/home'} >Home</NavLink>    
                </a>
                <a href='#musics' onClick={()=>setActiveNav('#musics')} className={activeNav === "#musics" ? 'active' : ''} >
                    <NavLink to={'/musics'} >Musics</NavLink>    
                </a>
                <a href='#premium' onClick={()=>setActiveNav('#premium')} className={activeNav === "#premium" ? 'active' : ''}>
                    <NavLink to={'/premium'} >Premium</NavLink> 
                </a>
                <a href='#contact' onClick={()=>setActiveNav('#contact')} className={activeNav === "#contact" ? 'active' : ''} >
                    <NavLink to={'/contact'} > Contact Us</NavLink> 
                </a>
            </ul>



            <Popover >
              <PopoverTrigger>
                <Button>
                    <motion.div     
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.1 }} 
                        whileHover={{scale: 0.92}}
                        className='flex' 
                        onClick={!name?()=>navigate('/signin') : ()=>navigate('')} 
                        >
                            <p className=' my-3 mx-3' >{firstName?firstName: 'Sign in'} </p>
                            <img src={profileIMG} className='h-8 w-8 my-2 rounded-3xl shadow-xl' />
                    </motion.div>
                </Button>
              </PopoverTrigger>
              
              <PopoverContent 
                className=' w-44 p-1 right-8 rounded-lg'
                style={{ boxShadow: '10px 10px 25px gray', display:state.user? 'block': 'none' }}>
                <p>Profile</p>
                <p>My Favorites</p>
                <div style={style.divider}></div>
                <h6 onClick={logOut}style={{cursor: 'pointer'}}>Sign Out</h6>
              </PopoverContent>
            </Popover>
        </div>
    </header>
  )
}

export default Navbar