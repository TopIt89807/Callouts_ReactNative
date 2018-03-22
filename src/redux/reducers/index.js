import { combineReducers } from 'redux-immutable';
import user from './user';
import follow from './follow';
import post from './post';
import global from './global';

// export default combineReducers({
//     user,
//     follow,
//     post,
//     global,
// });

var appReducer = combineReducers({
    user,
    follow,
    post,
    global,
});

export default rootReducer = (state, action) => {
    if (action.type === 'SIGN_OUT') {
        state = undefined
    }
  
    return appReducer(state, action)
}