import axios from 'axios';

const createAxiosInstance = (baseURL = '') => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 3000,
    });

    return instance
}

interface companyCodeCreateForm {
    companyId: string;
    companyName: string;
}

const instance = createAxiosInstance('http://localhost:8080')

export const createCompanyCode = function (requestBody: companyCodeCreateForm) {
    return instance.post(`/test/company-codes`, requestBody)
        .then(res => res.data)
        .catch(err => err)
}

export const getCompanyCode = function () {
    return instance.get(`/test/company-codes`)
        .then(res => res.data)
        .catch(err => err)
}

export const getDepartmentCode = function (companyId: string) {
    return instance.get(`/test/company-codes/${companyId}`)
        .then(res => res.data)
        .catch(err => err)
}