import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    authState: authReducer,
    usersState: userReducer,
    profileState: profileReducer
});