import {combineReducers} from 'redux';
import login from "./login";
import loader from "./loader";
import crud from "./crud";

const rootReducer = combineReducers({
    login, 
    loader,
    crud,
});

export default rootReducer;