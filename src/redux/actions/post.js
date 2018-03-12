import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    addPost: ['master', 'text', 'image'],
    getPosts: ['master'],
    getAll: null,
}, {});

export {
    Types,
    Creators,
}