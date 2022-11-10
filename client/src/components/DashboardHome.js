import React, { useContext, useEffect } from 'react'
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from '../api/api';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'
import DashboardCard from './ChilidComponents/DashboardCard'
import {HiUsers} from 'react-icons/hi';
import {RiNeteaseCloudMusicLine} from 'react-icons/ri';
import {MdAlbum} from 'react-icons/md';
import {HiMusicalNote} from 'react-icons/hi2';


const DashboardHome = () => {

  const {state, dispatch} = useContext(StateContext);

  const {allUsers, allArtists, allAlbums, allSongs} = state;

  useEffect(() => {
    if(allUsers === null || allUsers === undefined){
      getAllUsers().then((data)=>{
        dispatch({type: actionType.SET_ALL_USERS, allUsers: data.result})
      });
    }

    if(allArtists === null || allArtists === undefined){
      getAllArtist().then((data)=>{
        dispatch({type: actionType.SET_ALL_ARTISTS, allArtists: data.result})
      });
    }

    if(allAlbums === null || allAlbums === undefined){
      getAllAlbums().then((data)=>{
        dispatch({type: actionType.SET_ALL_ALBUMS, allAlbums: data.allAlbums})
      });
    }

    if(allSongs === null || allSongs === undefined){
      getAllSongs().then((data)=>{
        dispatch({type: actionType.SET_ALL_SONGS, allSongs: data.result});
      })
    }

  }, []);

  

  return (
    <div className='flex justify-evenly text-slate-900 m-auto h-20 w-4/5' >
        <DashboardCard icon={ <HiUsers /> }                 name={"Users"}    length={allUsers?.length > 0 ? allUsers.length : 0}  />
        <DashboardCard icon={ <HiMusicalNote /> }           name={"Songs"}    length={allSongs?.length > 0 ? allSongs.length : 0} />
        <DashboardCard icon={ <RiNeteaseCloudMusicLine /> } name={"Artists"}  length={allArtists?.length> 0 ? allArtists.length : 0} />
        <DashboardCard icon={ <MdAlbum /> }                 name={"Albums"}   length={allAlbums?.length> 0 ? allAlbums.length : 0} />
    </div>
  )
}

export default DashboardHome