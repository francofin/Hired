import React, {useState, useEffect} from 'react';
import Spinner from './Spinner';
import {useHistory} from 'react-router-dom';



const SpinnerRedirect = ({path}) => {

    const [count, setCount] = useState(5);
    const history = useHistory();

    useEffect(() => {

        const interval = setInterval(()=>{
            setCount((currentCount) => currentCount -=1);
        }, 1000)


        // for(let i=count; i>0; i--){
        //     setCount(i);
        // }

        // history.push(path);

        count === 0 && history.push(path);

        return () => clearInterval(interval)
    }, [count]);


    return(
        <Spinner counter={count}/>
    )
}

export default SpinnerRedirect;


