import React, { createContext, useReducer } from 'react'
import { reducer } from './reducer';


export const StateContext = createContext();
const StateProvider = (props) => {


    const initialState = {
        user: null,
        allUsers: null,
        allSongs: null,
        allArtists: null,
        allAlbums: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={{state, dispatch}}>
            {props.children}
        </StateContext.Provider>
    )
}

export default StateProvider