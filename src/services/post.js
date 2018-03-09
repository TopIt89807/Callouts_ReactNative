import request from './fetchApi';

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
