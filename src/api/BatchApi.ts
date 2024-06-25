import axios from 'axios';

const createAxiosInstance = (baseURL = '') => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 360000,
    });

    return instance
}

const instance = createAxiosInstance('http://localhost:8070')

export const runBatchJob = function (requestBody: object) {

    return instance.post(`/batch/job/run`, requestBody)
        .then((res) => res)
        .catch((err) => err)
}
