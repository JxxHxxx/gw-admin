import axios from "axios";

const createAxiosInstance = (baseURL = '') => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 3000,
        withCredentials : true
    });

    return instance
}

const instance = createAxiosInstance('http://localhost:8080')


export const SignIn = (requestBody: object) => {

    return instance.post(`/api/auth/login`, requestBody)
        .then(res => res)
        .catch(err => alert(err))
}


