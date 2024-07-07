import axios from 'axios';

const createAxiosInstance = (baseURL = '') => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 3000,
    });

    return instance
}

const instance = createAxiosInstance('http://localhost:8000')

export const searchConfirmDocuments = function (params?: object) {

    return instance.get(`/api/confirm-documents/fetch-approval-lines`, {params})
        .then((res) => res)
        .catch((err) => err)
}