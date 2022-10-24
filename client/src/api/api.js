import axios from 'axios';


const baseURL = 'http://localhost:8000/';

export const validateUser = async(token)=>{
    try {
        const res = await axios.get(`${baseURL}api/users/login`,
        {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        // return res.status(500).send({message: error});
    }
}