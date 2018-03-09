import request from './fetchApi';

export const followAdd = (follower, following, token) => {
    let data = {
        follower,
        following,
    };
    let option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        },
    };
  
    const url = 'api/follow/add';
    return request(url, option)
}

export const check = (follower, following, token) => {
    let data = {
        follower,
        following,
    };
    let option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    };
  
    const url = 'api/follow/check_exist';
    return request(url, option)
}

export const getFollowings = (follower, token) => {
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
  
    const url = 'api/follow/get_followings';
    return request(url, option)
}
