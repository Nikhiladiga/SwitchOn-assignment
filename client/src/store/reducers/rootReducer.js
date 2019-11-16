import authReducer from './authReducer';
import numberReducer from './numberReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    number: numberReducer
});

export default rootReducer;