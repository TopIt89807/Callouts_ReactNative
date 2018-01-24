import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from 'redux/actions/user'
import { success } from 'utils/action'

export const initialState = Immutable({
    result: {},
})

const signInSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const signUpSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const handler = {
    [success(Types.SIGN_IN)]: signInSuccess,
    [success(Types.SIGN_UP)]: signUpSuccess,
}

export default createReducer(initialState, handler);