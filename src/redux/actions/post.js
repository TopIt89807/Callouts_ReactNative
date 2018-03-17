import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    addPost: ['master', 'text', 'image', 'thumb_img'],
    updatePost: ['id', 'master', 'text', 'image', 'thumb_img'],
    deletePost: ['id'],
    getPosts: ['master'],
    getAll: null,
}, {});

export {
    Types,
    Creators,
}