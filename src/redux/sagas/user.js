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
  }
}

function* signUp(action) {
  try {
    yield put(requestCreator(Types.SIGN_UP))
    const result = yield call(services.signUp, action.email, action.password, action.user_type)
    if(result.status == 201)
      yield put(successCreator(Types.SIGN_UP, { result, show: 1 }))
    else 
      yield put(failureCreator(Types.SIGN_UP, { err: result }))
  } catch(err) {
    yield put(failureCreator(Types.SIGN_UP, { err }))
  }
}

function* getUsers(action) {
  try {
    yield put(requestCreator(Types.GET_USERS))
    const res = yield select(state => state.get('user'));
    const token = res.result.token;
    const result = yield call(services.getUsers, action.user_type, token);
    if(result.status == 200)
      yield put(successCreator(Types.GET_USERS, { list: result.list }))
    else 
      yield put(failureCreator(Types.GET_USERS, { err: result }))
  
  } catch(err) {
    yield put(failureCreator(Types.GET_USERS, { err }))
  }
}

export function* userSaga() {
  yield all([
    takeLatest(Types.SIGN_IN, signIn),
    takeLatest(Types.SIGN_UP, signUp),
    takeLatest(Types.GET_USERS, getUsers),
  ])
}
