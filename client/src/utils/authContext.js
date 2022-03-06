import {fireBaseAuth} from '../utils/firebase';
import React, {useReducer, createContext, useEffect} from 'react';
import { onAuthStateChanged, getIdTokenResult  } from "firebase/auth";
//reducer

const firebaseReducer = (state, action) => {
    switch(action.type){
        case "LOGGED_IN_USER":
            return {...state, user: action.payload}
        default:
            return state
    }
}

//reducer functions update state
const initialState = {
    user: null,
};


//create context
const AuthContext = createContext();

//context provider
const AuthProvider = (props) => {
    const[state, dispatch] = useReducer(firebaseReducer, initialState);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fireBaseAuth, async (user) => {
            if(user){
                const idTokenResult = await getIdTokenResult(user);

                dispatch({
                    type:'LOGGED_IN_USER',
                    payload:{email: user.email, token:idTokenResult.token}
                });
            } else{
                dispatch({
                    type:'LOGGED_IN_USER',
                    payload: null
                });
            }
        })

        return () => unsubscribe();
    }, [])

    const value = {state, dispatch};
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

//export

export {AuthContext, AuthProvider};
