import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from 'redux/actions/post'
import { success } from 'utils/action'

export const initialState = Immutable({
    result: {},
    posts: [],
})

const getPostsSuccess = (state, action) => ({
    ...state,
    posts: [
        ...action.payload.list
    ]
})

const getAllSuccess = (state, action) => ({
    ...state,
    posts: [
        ...action.payload.list
    ]
})

const handler = {
    [success(Types.GET_POSTS)]: getPostsSuccess,
    [success(Types.GET_ALL)]: getAllSuccess,
}

export default createReducer(initialState, handler);