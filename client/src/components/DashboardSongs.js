import React, { useContext, useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom';
import {IoAdd} from 'react-icons/io5';
import { StateContext } from '../context/StateProvider';
import {getAllSongs} from '../api/api'
import { actionType } from '../context/reducer';
import SongCard from './ChilidComponents/SongCard';

const DashboardSongs = () => {

  const [searchSong , setSearchSong] = useState("");
  const {state, dispatch} = useContext(StateContext);
  const {allSongs} = state;

  // -----------------------FETCH SONGS--------------------------
  useEffect(() => {
    if(!allSongs){
      getAllSongs().then((data)=>{
        console.log(data.result)
        dispatch({type: actionType.SET_ALL_SONGS, allSongs: data.result})
      })
    }
  }, [])
  

  return (
    <div className=' w-4/5 h-auto m-auto'>
      <div className='w-full h-fit pb-20 flex justify-center items-center gap-20'>
        <NavLink to='/dashboard/newSong'>
          <IoAdd className=' bg-slate-50 rounded-md text-slate-900 text-3xl hover:text-2xl transition-all duration-200 shadow-lg shadow-slate-500' />
        </NavLink>

        <input
          type="text"
          className= {`h-8 rounded-md outline-none shadow-lg shadow-slate-500 text-slate-900 pl-2`}
          placeholder="Search song..."
          value={searchSong}
          onChange={(e)=>setSearchSong(e.target.value)}
        />
      </div>

      <div className='w-full h-auto p-1 grid grid-cols-5 rounded-xl'>
        {
          allSongs.map((elm)=>{
            return(
              <>
                <SongCard imageURL={elm.imageURL} name={elm.name} artist={elm.artist} />
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default DashboardSongs