import React from 'react'
import {AiFillHome} from 'react-icons/ai'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='h-auto w-5/6 relative top-20 bg-slate-800'>
        <div className=' flex justify-between text-white text-xl'>
            <AiFillHome />
            
            <NavLink to='/dashboard/users' cla >Users</NavLink>
            <NavLink to='/dashboard/users' cla >Songs</NavLink>
        </div>
    </div>
  )
}

export default Dashboard