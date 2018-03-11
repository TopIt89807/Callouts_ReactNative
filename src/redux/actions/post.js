import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getPosts: ['master'],
    getAll: null,
}, {});

export {
    Types,
    Creators,
}