import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    updateStates : ['payload'],
    showMessage : ['option'],
}, {});

export {
    Types,
    Creators,
}