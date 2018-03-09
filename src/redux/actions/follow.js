import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    followAdd: ['following'],
    followCheck: ['following'],
    setTabIndex: ['index'],
}, {});

export {
    Types,
    Creators,
}