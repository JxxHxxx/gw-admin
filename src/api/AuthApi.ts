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

const SignIn = (requestBody: object) => {

    return instance.post(`/api/auth/login`, requestBody)
        .then(res => res)
        .catch(err => {
            console
            return err
        })
}


const AuthApi = {
    SignIn
} 

export default AuthApi;
