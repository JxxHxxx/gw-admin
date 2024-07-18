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

    return instance.get(`/api/confirm-documents/search`, { params })
        .then((res) => res)
        .catch((err) => err)
}

export const findConfirmDocumentByConfirmDocumentId = function (confirmDocumentId: string) {

    return instance.get(`/api/confirm-documents/${confirmDocumentId}`)
        .then((res) => res)
        .catch((err) => err)
}

export const getConfirmDocumentContent = function (contentPk: number) {
    return instance.get(`/api/confirm-documents/contents/${contentPk}`)
        .then((res) => res)
        .catch((err) => err)
}

export const getConfirmDocumentFormElements = function (confirmDocumentFormId: string) {
    const params = {
        companyId: 'COM'
    }
    return instance.get(`/api/confirm-document-forms/${confirmDocumentFormId}/elements`, { params })
        .then((res) => res)
        .catch((err) => err)
}

// 결재 문서 양식 조회 API
export const findConfirmForms = function () {
    return instance.get(`/admin/confirm-document-forms`)
        .then((res) => res)
        .catch((err) => err)
}