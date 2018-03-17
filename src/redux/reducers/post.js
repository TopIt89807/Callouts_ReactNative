import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from 'redux/actions/post'
import { success } from 'utils/action'

export const initialState = Immutable({
    result: {},
    posts: [],
})

const addPostSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const updatePostSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const deletePostSuccess = (state, action) => ({
    ...state,
    ...action.payload
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
    [success(Types.ADD_POST)]: addPostSuccess,
    [success(Types.UPDATE_POST)]: updatePostSuccess,
    [success(Types.DELETE_POST)]: deletePostSuccess,
    [success(Types.GET_POSTS)]: getPostsSuccess,
    [success(Types.GET_ALL)]: getAllSuccess,
}

export default createReducer(initialState, handler);