import React from 'react'
import {BiCloudUpload} from 'react-icons/bi';
import {getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import {storage} from "../../config/firebase.config"

const FileUploader = ({updateState, setProgress, isLoading, isImage}) => {

    const uploadFile = (e)=>{
        isLoading(true);
        const uploadedFile = e.target.files[0];
        const storageRef = ref(storage, `${isImage ? "/Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
        uploadTask.on("state-changed", (snapshot)=>{
            setProgress((snapshot.bytesTransferred /snapshot.totalBytes ) * 100)
            },
            (err)=>{
                console.log(err);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref ).then((downloadURL)=>{
                    updateState(downloadURL);
                    isLoading(false);
                })
            }
        
        )
    }

  return (
    <label>
        <div className='flex flex-col items-center justify-center h-full' >
            <div className='flex flex-col items-center justify-center cursor-pointer' >
                <p className='text-[3rem] text-red-600' ><BiCloudUpload /> </p>
                <p className='text-lg text-red-600'> Click here to upload {isImage? "an image":"an audio"} </p>
            </div>
            <input
                type="file"
                name='upload-file'
                accept={`${isImage ? "image/*" : "audio/*" }`}
                className="w-0 h-0"
                onChange={uploadFile}
            />
        </div>
    </label>
  )
}

export default FileUploader