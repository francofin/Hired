const startTime = Date.now();
const defaultState = [];

const seedData = [
    {
        topic:"Crypto",
        articlesLength: 10
    },
    {
        topic:"Rust",
        articlesLength: 10
    },
    {
        topic:"Meta",
        articlesLength: 10
    },

]

export default (state = seedData, action) => {
    if (action.type ==="UpdatetechNews"){
        console.log("In tech Reducer");
        console.log(action.payload)
        return action.payload;
    } else {
        return state;
    }
}