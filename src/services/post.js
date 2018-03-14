import request from './fetchApi';

export const addPost = (master_id, text, image, token) => {
    let data = {
        master_id,
        text,
        image,
        thumb_img: image,
    };
    console.log(image);
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

export const getAll = (token) => {
    let option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    };
  
    const url = 'api/post/get_all';
    return request(url, option)
}
