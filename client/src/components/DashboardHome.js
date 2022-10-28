import React, { useContext, useEffect } from 'react'
import { getAllArtist, getAllUsers } from '../api/api';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'
import DashboardCard from './ChilidComponents/DashboardCard'



const DashboardHome = () => {

  const {state, dispatch} = useContext(StateContext);

  useEffect(() => {
    if(state.allUsers === null){
      getAllUsers().then((data)=>{
        dispatch({type: actionType.SET_ALL_USERS, data: data.result})
      });
    }

    if(state.allArtists === null){
      getAllArtist().then((data)=>{
        dispatch({type: actionType.SET_ALL_ARTISTS, data: data.result})
      });
    }
  }, [])
  

  return (
    <div className='flex justify-evenly text-slate-900 m-auto h-20 w-4/5 bg-slate-50' >
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
    </div>
  )
}

export default DashboardHome