import axios from 'axios';

const createAxiosInstance = (baseURL = '') => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 3000,
    });

    return instance
}

const instance = createAxiosInstance('http://localhost:8080')

export const getMessageQResult = function (params:object) {

    return instance.get(`/test/message-q-results`, { params })
    .then((res) => res)
    .catch((err) => err)
}
