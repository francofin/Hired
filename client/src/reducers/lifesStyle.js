

export default (state = [], action) => {
    if (action.type ==="UpdateLifeStyleNews"){
        console.log("In lifestyle Reducer");
        console.log(action)
        return state;
    } else {
        return state;
    }
}