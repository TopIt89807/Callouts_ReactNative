import { combineReducers } from 'redux-immutable';
import user from './user';
import global from './global';

export default combineReducers({
    user,
    global,
});