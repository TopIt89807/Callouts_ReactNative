import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getPosts: ['master'],
}, {});

export {
    Types,
    Creators,
}