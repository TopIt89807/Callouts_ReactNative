import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore, compose } from 'redux';

import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const setupStore = (initialState = fromJS({})) => {
    const middlewares = [
        sagaMiddleware,
    ];
    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    const store = createStore(reducer, initialState, compose(...enhancers));

    sagas.forEach(saga => sagaMiddleware.run(saga));

    return store;
}

export default setupStore;