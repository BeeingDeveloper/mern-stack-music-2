import React, { useContext, useEffect, useState } from 'react'
import { getAllAlbums, getAllArtist } from '../api/api';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider';
import FileLoader from './ChilidComponents/FileLoader';
import FileUploader from './ChilidComponents/FileUploader';
import {MdDelete} from 'react-icons/md'
import { storage } from '../config/firebase.config';
import { deleteObject, ref } from 'firebase/storage';
const DashboardNewSong = () => {

    const [songName, setSongName] = useState("");
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [songImageCover, setSongImageCover] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(0)
    const {state, dispatch} = useContext(StateContext);
    const {allArtists, allAlbums} = state;

    useEffect(()=>{
        if(!allArtists){
            getAllArtist().then((data)=>{
                dispatch({type: actionType.SET_ALL_ARTISTS, allArtists: data.result});
            });
        }

        if(!allAlbums){
            getAllAlbums().then((data)=>[
                dispatch({type: actionType.SET_ALL_ALBUMS, allAlbums: data.allAlbums})
            ]);
        }
    }, [])
    const deleteFileObject = (url, isImage) =>{
        if(isImage){
            setIsImageLoading(true);
            
        }
        const deleteRef = ref (storage, url);
        deleteObject(deleteRef).then(()=>{
            setSongImageCover(null);
            setIsImageLoading(false);
        })
    }

    return (
    <div className='flex flex-col items-center justify-center p-4 border border-slate-800' >
        <input 
            type="text"
            placeholder='Type song name...'
            className='w-full h-8 rounded-md pl-2 text-slate-900'
            value={songName}
            onChange={(e)=>setSongName(e.target.value)}
        />

        <div className=' bg-slate-800 backdrop-blur-md w-full h-300 rounded-lg mt-5'>
            {isImageLoading && (<FileLoader progress={imageUploadProgress} /> )}
            {!isImageLoading && (
                <>
                    {!songImageCover ? ( <FileUploader 
                                            updateState={setSongImageCover} 
                                            setProgress={setImageUploadProgress} 
                                            isLoading={setIsImageLoading}
                                            isImage={true} />
                                            ):
                                            (<div className='relative w-full h-full overflow-hidden rounded-md'>
                                                <img src={songImageCover} className='w-full h-full object-cover' />
                                                <button className='absolute bottom-3 right-3 p-3 bg-red-600 rounded-full'
                                                    onClick={()=>deleteFileObject(songImageCover, true)}
                                                > 
                                                    <MdDelete className='text-slate-50' /> 
                                                </button>
                                            </div>)}
                </>
            )}
        </div>

    </div>
  )
}

export default DashboardNewSong










        {/* <div className='flex w-full justify-between flex-wrap items-center gap-5'>
            <FilterButton filterData={allArtists} flag={"Artist"} />
            <FilterButton filterData={allAlbums} flag={"Album"} />
            <FilterButton filterData={""} flag={"Language"} />
            <FilterButton filterData={""} flag={"Category"} />

        </div> */}