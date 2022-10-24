import React, { createContext, useReducer } from 'react'

const StateContext = createContext();
const StateProvider = () => {


    const initialState = {
        user: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={{state, dispatch}}>
            {props.children}
        </StateContext.Provider>
    )
}

export default StateProvider