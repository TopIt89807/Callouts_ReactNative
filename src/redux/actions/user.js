import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    signIn: ['email', 'password'],
    signUp: ['email', 'password', 'user_type'],
    getUsers: ['user_type'],
    signOut: null,
}, {});

export {
    Types,
    Creators,
}