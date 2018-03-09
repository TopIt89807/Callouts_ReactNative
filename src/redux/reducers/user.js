import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from 'redux/actions/user'
import { success } from 'utils/action'

export const initialState = Immutable({
    result: {},
    masters: [],
})

const signInSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const signUpSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const getUsersSuccess = (state, action) => ({
    ...state,
    masters: [
        ...action.payload.list
    ]
})

const handler = {
    [success(Types.SIGN_IN)]: signInSuccess,
    [success(Types.SIGN_UP)]: signUpSuccess,
    [success(Types.GET_USERS)]: getUsersSuccess,
}

export default createReducer(initialState, handler);