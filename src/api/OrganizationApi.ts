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
        .catch(() => alert('http://localhost:8080 서버와의 연결이 실패했습니다. 관리자에게 문의하세요.'))
}

export const getCompanyCode = function () {
    return instance.get(`/test/company-codes`)
        .then(res => res.data)
        .catch(() => alert('http://localhost:8080 서버와의 연결이 실패했습니다. 관리자에게 문의하세요.'))
}

export const getDepartmentCode = function (companyId: string) {
    return instance.get(`/test/company-codes/${companyId}`)
        .then(res => res.data)
        .catch(() => alert('http://localhost:8080 서버와의 연결이 실패했습니다. 관리자에게 문의하세요.'))
}