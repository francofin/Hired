import { Route } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';
import React, {useEffect, useState, useContext} from "react";



const PrivateRoute = ({children, ...rest}) => {

    const {state} = useContext(AuthContext);
    const [user, setUser] = useState(false);


    useEffect(() => {
        if(state.user){
            setUser(true);
        }
        
    }, [state.user]);


    const renderContent = () =>{
        return(
            <>
                <Route {...rest} />
            </>
        )
    }


    return user ? renderContent() : ""

};



export default PrivateRoute;