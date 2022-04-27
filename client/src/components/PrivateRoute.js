import { Route } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';
import React, {useEffect, useState, useContext} from "react";
import SpinnerRedirect from './SpinnerRedirect';


const PrivateRoute = ({children, ...rest}) => {

    const {state} = useContext(AuthContext);
    const [user, setUser] = useState(false);


    useEffect(() => {
        if(state.user){
            setUser(true);
        }
        
    }, [state.user]);


    const renderContent = () =>(
        <>
            <Route {...rest} />
        </>
    )


    return user ? renderContent() : <SpinnerRedirect path="/login"/>;

};



export default PrivateRoute;