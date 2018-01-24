import request from './fetchApi';

export const signIn = (email, password) => {
    let data = {email: email, password: password};
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