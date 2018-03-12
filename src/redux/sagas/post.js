import { put, call, select, takeLatest, all } from 'redux-saga/effects'
import { Types, Creators } from 'redux/actions/post'
import * as services from 'services/post'
import { requestCreator, successCreator, failureCreator } from 'utils/action'

function* addPost(action) {
  try {
    yield put(requestCreator(Types.ADD_POST))
    const res = yield select(state => state.get('user'));
    const token = res.result.token;
    const result = yield call(services.addPost, action.master, action.text, action.image, token)
    if(result.status == 200)
        yield put(successCreator(Types.ADD_POST, { result, show: 1 }))
    else 
        yield put(failureCreator(Types.ADD_POST, { err: result }))
  } catch (err) {
      yield put(failureCreator(Types.ADD_POST, { err }))
  }
}

function* getPosts(action) {
  try {
    yield put(requestCreator(Types.GET_POSTS))
    const res = yield select(state => state.get('user'));
    const token = res.result.token;
    const result = yield call(services.getPosts, action.master, token)
    if(result.status == 200)
        yield put(successCreator(Types.GET_POSTS, { list: result.list }))
    else 
        yield put(failureCreator(Types.GET_POSTS, { err: result }))
  } catch (err) {
      yield put(failureCreator(Types.GET_POSTS, { err }))
  }
}

function* getAll(action) {
  try {
    yield put(requestCreator(Types.GET_ALL))
    const res = yield select(state => state.get('user'));
    const token = res.result.token;
    const result = yield call(services.getAll, token)
    if(result.status == 200)
        yield put(successCreator(Types.GET_ALL, { list: result.list }))
    else 
        yield put(failureCreator(Types.GET_ALL, { err: result }))
  } catch (err) {
      yield put(failureCreator(Types.GET_ALL, { err }))
  }
}

export function* postSaga() {
  yield all([
    takeLatest(Types.ADD_POST, addPost),
    takeLatest(Types.GET_POSTS, getPosts),
    takeLatest(Types.GET_ALL, getAll),
  ])
}
