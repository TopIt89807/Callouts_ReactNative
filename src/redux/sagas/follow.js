import { put, call, select, takeLatest, all } from 'redux-saga/effects'
import { Types, Creators } from 'redux/actions/follow'
import * as services from 'services/follow'
import { requestCreator, successCreator, failureCreator } from 'utils/action'

function* followAdd(action) {
  try {
    yield put(requestCreator(Types.FOLLOW_ADD))
    const res = yield select(state => state.get('user'));
    const token = res.result.token;
    const follower = res.result.user.id;
    const result = yield call(services.followAdd, follower, action.following, token)
    if(result.status == 201)
        yield put(successCreator(Types.FOLLOW_ADD, { result, show: 1 }))
    else 
        yield put(failureCreator(Types.FOLLOW_ADD, { err: result }))
  } catch (err) {
      yield put(failureCreator(Types.FOLLOW_ADD, { err }))
  }
}

function* followCheck(action) {
  try {
    yield put(requestCreator(Types.FOLLOW_CHECK))
    const res = yield select(state => state.get('user'));
    const token = res.result.token;
    const follower = res.result.user.id;
    const result = yield call(services.check, follower, action.following, token)
    if(result.status == 200)
        yield put(successCreator(Types.FOLLOW_CHECK, { result }))
    else 
        yield put(failureCreator(Types.FOLLOW_CHECK, { err: result }))
  } catch (err) {
      yield put(failureCreator(Types.FOLLOW_CHECK, { err }))
  }
}

function* getFollowings(action) {
  try {
    yield put(requestCreator(Types.GET_FOLLOWINGS))
    const res = yield select(state => state.get('user'));
    const token = res.result.token;
    const follower = res.result.user.id;
    const result = yield call(services.getFollowings, follower, token)
    if(result.status == 200)
        yield put(successCreator(Types.GET_FOLLOWINGS, { list: result.list }))
    else 
        yield put(failureCreator(Types.GET_FOLLOWINGS, { err: result, show: 0 }))
  } catch (err) {
      yield put(failureCreator(Types.GET_FOLLOWINGS, { err }))
  }
}

export function* followSaga() {
  yield all([
    takeLatest(Types.FOLLOW_ADD, followAdd),
    takeLatest(Types.FOLLOW_CHECK, followCheck),
    takeLatest(Types.GET_FOLLOWINGS, getFollowings),
  ])
}
