import axios from 'axios';

const createAxiosInstance = (baseURL = '') => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 360000,
    });

    return instance
}
const CONNECTION_FAIL_MSG = 'http://localhost:8070 서버와의 연결이 실패했습니다. 관리자에게 문의하세요.'

const instance = createAxiosInstance('http://localhost:8070')

export const runBatchJob = function (requestBody: object) {

    return instance.post(`/admin/batch/job/run`, requestBody)
        .then((res) => res)
        .catch(() => alert(CONNECTION_FAIL_MSG))
}

export const getBatchJobParams = function (jobName:string) {
    return instance.get(`/admin/batch/jobs/${jobName}/parameters`)
    .then((res) => res)
    .catch(() => alert(CONNECTION_FAIL_MSG))
}

export const getBatchJobTrigger = function (params: object) {
    return instance.get(`/admin/batch/triggers`, { params })
        .then((res) => res)
        .catch(() => alert(CONNECTION_FAIL_MSG))
}

export const getAllBatchJobTriggers = function () {
    return instance.get(`/admin/batch/triggers/all` )
        .then((res) => res)
        .catch(() => alert(CONNECTION_FAIL_MSG))
}

export const getBatcJobHistory = function (params?: object) {
    return instance.get(`/admin/batch/jobs-hist`, { params })
        .then((res) => res)
        .catch(() => alert(CONNECTION_FAIL_MSG))
}