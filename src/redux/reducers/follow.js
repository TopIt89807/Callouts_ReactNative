import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from 'redux/actions/follow'
import { success } from 'utils/action'

export const initialState = Immutable({
    result: {},
    tab: 0,
})

const followAddSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const followCheckSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const setTabIndex = (state, action) => ({
    ...state,
    tab: action.index
})

const handler = {
    [success(Types.FOLLOW_ADD)]: followAddSuccess,
    [success(Types.FOLLOW_CHECK)]: followCheckSuccess,
    [Types.SET_TAB_INDEX]: setTabIndex,
}

export default createReducer(initialState, handler);