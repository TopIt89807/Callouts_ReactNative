import { combineReducers } from 'redux-immutable';
import user from './user';
import follow from './follow';
import global from './global';

export default combineReducers({
    user,
    follow,
    global,
});