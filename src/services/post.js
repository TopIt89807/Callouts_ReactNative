import request from './fetchApi';

export const addPost = (master_id, text, image, thumb_img, token) => {
    let data = {
        master_id,
        text,
        image,
        thumb_img,
    };
    let option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    };
  
    const url = 'api/post/add';
    return request(url, option)
}

export const updatePost = (id, master_id, text, image, thumb_img, token) => {
    let data = {
        id,
        master_id,
        text,
        image,
        thumb_img,
    };
    let option = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    };
  
    const url = 'api/post/update';
    return request(url, option)
}

export const deletePost = (id, token) => {
    let data = {
        id,
    };
    let option = {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    };
  
    const url = 'api/post/delete';
    return request(url, option)
}

export const getPosts = (master_id, token) => {
    let data = {
        master_id,
    };
    let option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    };
  
    const url = 'api/post/get_posts';
    return request(url, option)
}

export const getAll = (follower, token) => {
    let data = {
        follower,
    };
    let option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    };
  
    const url = 'api/post/get_all';
    return request(url, option)
}
