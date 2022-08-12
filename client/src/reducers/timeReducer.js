import moment from "moment";

const now = Date.now()
const startTime = moment(now);
const refreshtime = startTime.clone().add(30, 'minutes');
const isRefreshNeeded = true

const refreshSignal = {
    startTime,
    refreshtime,
    isRefreshNeeded
}




export default (state = refreshSignal, action) => {

    return state;
}