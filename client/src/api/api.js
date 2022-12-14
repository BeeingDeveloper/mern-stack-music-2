import axios from 'axios';


const baseURL = 'http://localhost:8000/';

export const validateUser = async(token)=>{
    try {
        const res = await axios.get(`${baseURL}api/users/login`,
        {
            headers: { Authorization: "Bearer " + token }
        });
        return res.data;
    } catch (error) {
        // return res.status(500).send({message: error});
    }
}

export const getAllUsers = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllArtist = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/artist/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllAlbums = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/albums/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllSongs = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/songs/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const saveNewSong = async(data)=>{
    try {
        const res = await axios.post(`${baseURL}api/songs/save`, {...data});
        return res.data.savedSong;
    } catch (error) {
        return null;
    }
}