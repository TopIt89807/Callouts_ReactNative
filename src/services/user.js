import request from './fetchApi';

export const signIn = (email, password) => {
    let data = {
      email,
      password,
    };
    let option = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    };
    
    const url = 'api/users/login';
    return request(url, option)
}

export const signUp = (email, password, user_type) => {
  let data = {
    email,
    password,
    user_type,
  };
  let option = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  
  const url = 'api/users/signup';
  return request(url, option)
}