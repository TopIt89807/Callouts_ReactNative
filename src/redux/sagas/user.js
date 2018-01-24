import { put, call, select, takeLatest, all } from 'redux-saga/effects'
import { Types, Creators } from 'redux/actions/user'
import * as services from 'services/user'
import { requestCreator, successCreator, failureCreator } from 'utils/action'

function* signIn(action) {
  try {
    yield put(requestCreator(Types.SIGN_IN))
    const result = yield call(services.signIn, action.email, action.password)
    if(result.status == 200)
        yield put(successCreator(Types.SIGN_IN, { result }))
    else 
        yield put(failureCreator(Types.SIGN_IN, { err: result }))
  } catch (err) {
      yield put(failureCreator(Types.SIGN_IN, { err }))
    // if (err.code === 'UserNotConfirmedException') {
    //   yield put(successCreator(Types.SIGN_IN, { result: {}, err }))
    // } else {
    //   yield put(failureCreator(Types.SIGN_IN, { err }))
    // }
  }
}

export function* userSaga() {
  yield all([
    takeLatest(Types.SIGN_IN, signIn),
  ])
}
