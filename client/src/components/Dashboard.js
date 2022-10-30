import React from 'react'
import {IoHome} from 'react-icons/io5';
import { NavLink, Route, Routes } from 'react-router-dom';
import DashboardHome from '../components/DashboardHome'
import DashboardAlbum from './DashboardAlbum';
import DashboardArtist from './DashboardArtist';
import DashboardNewSong from './DashboardNewSong';
import DashboardSongs from './DashboardSongs';
import DashboardUser from './DashboardUser';

const Dashboard = () => {
  return (
    <div className=' w-full relative top-14 bg-slate-900 text-slate-300'>
      <div className=' flex justify-between w-4/12 m-auto pt-10'>
        <NavLink to='/dashboard/home'   className=' text-lg' > <IoHome /> </NavLink>
        <NavLink to='/dashboard/user'   className='' > Users </NavLink>
        <NavLink to='/dashboard/songs'  className='' > Songs </NavLink>
        <NavLink to='/dashboard/artist' className='' > Artists </NavLink>
        <NavLink to='/dashboard/albums' className='' > Albums </NavLink>
      </div>

      <div className='m-4 p-10 w-full' >
        <Routes>
          <Route path='/home' element={ <DashboardHome /> } />
          <Route path='/songs' element={ <DashboardSongs /> } />
          <Route path='/user' element={ <DashboardUser /> } />
          <Route path='/artist' element={ <DashboardArtist /> } />
          <Route path='/albums' element={ <DashboardAlbum /> } />
          <Route path='/newSong' element={ <DashboardNewSong /> } />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard