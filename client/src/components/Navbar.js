import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/img/logo.png';
import './style.css'

const Navbar = () => {

    const [activeNav, setActiveNav] = useState("#");

  return (
    <header className=' flex '>
        <div className=' w-10/12 flex justify-between m-auto'>


            <NavLink>
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

            <div className='flex'>
                <p className=' my-3' >Name Akhter</p>
                <img src='' className='h-8 w-8 rounded-3xl bg-slate-500 my-2' />
            </div>
        </div>
    </header>
  )
}

export default Navbar