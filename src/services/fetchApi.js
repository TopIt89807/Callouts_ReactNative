const serverUrl = 'http://localhost:3000/';
export default function request(apiName, option){
    let myRequest = new Request(serverUrl + apiName, option);
    return new Promise((resolve, reject) => {
        fetch(myRequest)
            .then((response) => {
                return resolve(response.json().then(data => (
                    {
                        status: response.status,
                        ...data,
                    }
                )));
            })

            .catch((error) => {
                return reject(error);
            })
    })
}
