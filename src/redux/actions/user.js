import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    signIn: ['email', 'password'],
}, {});

export {
    Types,
    Creators,
}