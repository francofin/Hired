import { combineReducers } from "redux";
import techNewsReducer from './techNews';
import lifeStyleReducer from './lifesStyle';
import timeReducer from './timeReducer';

const rootReducer = combineReducers({
    techNews: techNewsReducer,
    lifeStyle:lifeStyleReducer,
    timer:timeReducer,
})

export default rootReducer;