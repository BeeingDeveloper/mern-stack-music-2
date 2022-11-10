import React, { useContext, useEffect, useState } from 'react'
import { getAllAlbums, getAllArtist, getAllSongs, saveNewSong } from '../api/api';
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
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [songImageCover, setSongImageCover] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [audioUploadProgress, setAudioUploadProgress] = useState(0);

    
    const {state, dispatch} = useContext(StateContext);
    const {allArtists, allAlbums, allSongs} = state;

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
    }, []);


    const deleteFileObject = (url, isImage) =>{
        if(isImage){
            setIsImageLoading(true);
            setIsAudioLoading(true);
        }
        const deleteRef = ref (storage, url);
        deleteObject(deleteRef).then(()=>{
            setSongImageCover(null);
            setAudioURL(null);
            setIsImageLoading(false);
        })
    }
    const saveSong = ()=>{
        if(!songImageCover || !audioURL){
            alert('Song cannot be empty');
        }else{
            setIsAudioLoading(true);
            setIsImageLoading(true);
        }
        
        const data = {
            name: songName,
            imageURL: songImageCover,
            songURL: audioURL,
            album: 'Hybrid Theory',
            artist: 'unknown',
            language: 'unknown',
            category: 'unknown'
        }

        saveNewSong(data).then(res=>{
            getAllSongs().then((songs) =>{
                console.log("songs")
                dispatch({type: actionType.SET_ALL_SONGS, allSongs: songs.result })
            })
        })

    }

    return (
    <div className='flex flex-col items-center justify-center p-4 border rounded-lg border-slate-800' >
        <>
            <input 
                type="text"
                placeholder='Type song name...'
                className='w-full h-8 rounded-md pl-2 text-red-900 outline-none'
                value={songName}
                onChange={(e)=>setSongName(e.target.value)}
            />
    
            <div className=' bg-slate-800 backdrop-blur-md w-full h-300 rounded-lg mt-5'>
                {isImageLoading && (<FileLoader progress={imageUploadProgress} /> )}
                {!isImageLoading && (
                    <>
                        {!songImageCover ? ( <FileUploader 
                                                songCover={setSongImageCover} 
                                                setProgress={setImageUploadProgress} 
                                                isLoading={setIsImageLoading}
                                                isImage={true} />
                                              ):(<div className='relative w-full h-full overflow-hidden rounded-md'>
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

            <div className=' bg-slate-800 backdrop-blur-md w-full h-300 rounded-lg mt-5'>
                {isAudioLoading && (<FileLoader progress={audioUploadProgress} /> )}
                {!isAudioLoading && (
                    <>
                        {!audioURL ? ( <FileUploader
                                                songCover={setAudioURL} 
                                                setProgress={setAudioUploadProgress} 
                                                isLoading={setIsAudioLoading}
                                                isImage={false} />
                                              ):(<div className='relative flex items-center justify-center w-full h-full overflow-hidden rounded-md'>
                                                    <audio src={audioURL} controls ></audio>
                                                    <button type='button' className='absolute bottom-3 right-3 p-3 bg-red-600 rounded-full'
                                                        onClick={()=>deleteFileObject(audioURL, false)}
                                                    > 
                                                        <MdDelete className='text-slate-50' /> 
                                                    </button>
                                                </div>)}
                    </>
                )}
            </div>

            <div className='h-full pt-5'>
                {isImageLoading || isAudioLoading ? (
                    <button disabled className=' bg-red-400 rounded-lg py-1 px-2 cursor-not-allowed text-slate-700 font-bold' >Save Changes</button>
                ) : (
                    <button className=' bg-red-500 rounded-lg py-1 px-2 text-slate-900 font-bold' onClick={saveSong} >Save Changes</button>
                )}
            </div>          
        </>
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