import { put, select, takeEvery, all } from 'redux-saga/effects'
import { Types, Creators } from 'redux/actions/global'
import { originalType } from 'utils/action'

function* listenAction(action) {
  try {
    console.log(action)
    const { status } = yield select(state => state.get('global'))
    let newStatus
    if (action.type.endsWith('/request')) {
      newStatus = {
        ...status,
        effects: {
          ...status.effects,
          [originalType(action.type)]: 'request',
        }
      }
      yield put(Creators.updateStates({ status: newStatus }))
    } else if (action.type.endsWith('/success')) {
      newStatus = {
        ...status,
        effects: {
          ...status.effects,
          [originalType(action.type)]: 'success',
        }
      }
      yield put(Creators.updateStates({ status: newStatus }))
    } else if (action.type.endsWith('/failure')) {
      newStatus = {
        ...status,
        effects: {
          ...status.effects,
          [originalType(action.type)]: 'failure',
        }
      }
      yield put(Creators.updateStates({ status: newStatus }))

      if ( true ) {
        const { err } = action.payload
        yield put(Creators.showMessage({ visible: true, title: 'Error...', text: err.message || err.errorMessage }))
      }
    }
  } catch (err) {
    if ( true ) {
      yield put(Creators.showMessage({ visible: true, title: 'Error...', text: err.message || err.errorMessage }))
    }
  }
}

export function* globalSaga() {
  yield all([
    takeEvery('*', listenAction)
  ])
}
