
import moment from 'moment';

const timeReducer = () => {
    return(dispatch, getState) => {
        setInterval(() => {
            const state = getState();
            const now = Date.now()
            const startTime = moment(now);  
            let reloadNeeded;
            
            // if(state.timer.startTime)
            console.log(state)
            if(window.localStorage.getItem('clientReload')){
                console.log("Something here even though null");
                const createdStartTime = window.localStorage.getItem('clientFirstLoad');
                const createdRefreshTime = window.localStorage.getItem('clientReload');
                console.log(createdRefreshTime)
                console.log(createdRefreshTime -  startTime)
                if((createdRefreshTime -  startTime)< 0){
                    console.log(reloadNeeded)
                    dispatch({
                        type:"refresh"
                    })
                    window.localStorage.setItem('clientFirstLoad', startTime._i)
                    const refreshtime = startTime.clone().add(60, 'minutes');
                    window.localStorage.setItem('clientReload', refreshtime._i);
                    reloadNeeded = true;
                } 
            } else {
                window.localStorage.setItem('clientFirstLoad', startTime._i)
                const refreshtime = startTime.clone().add(60, 'minutes');
                console.log(refreshtime)
                window.localStorage.setItem('clientReload', refreshtime._i);
                reloadNeeded = false;
            }

            console.log(reloadNeeded)
            
        }, 5000) 
    }

}





export default timeReducer;



