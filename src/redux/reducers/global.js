import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import { Types } from 'redux/actions/global'
import { success } from 'utils/action'

export const initialState = Immutable({
  status: {
    effects: {},
  },
  message: {
    visible: false,
  }
})

const updateStates = (state, action) => ({
  ...state,
  ...action.payload,
})

const showMessage = (state, action) => ({
  ...state,
  message: {
    ...action.option,
  }
})

const handlers = {
  [Types.UPDATE_STATES]: updateStates,
  [Types.SHOW_MESSAGE]: showMessage,
}

export default createReducer(initialState, handlers)