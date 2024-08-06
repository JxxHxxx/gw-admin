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
        .catch(() => alert('결재 서버와의 연결이 원활하지 않습니다. 관리자에게 문의하세요.'))
}

export const findConfirmDocumentByConfirmDocumentId = function (confirmDocumentId: string) {

    return instance.get(`/api/confirm-documents/${confirmDocumentId}`)
        .then((res) => res)
        .catch(() => alert('결재 서버와의 연결이 원활하지 않습니다. 관리자에게 문의하세요.'))
}

export const getConfirmDocumentContent = function (contentPk: number) {
    return instance.get(`/api/confirm-documents/contents/${contentPk}`)
        .then((res) => res)
        .catch(() => alert('결재 서버와의 연결이 원활하지 않습니다. 관리자에게 문의하세요.'))
}

export const getConfirmDocumentFormElements = function (confirmDocumentFormId: string) {
    const params = {
        companyId: 'COM'
    }
    return instance.get(`/api/confirm-document-forms/${confirmDocumentFormId}/elements`, { params })
        .then((res) => res)
        .catch((err) => err)
}

// 결재 문서 양식 요소 조회
export const getConfirmDocumentFormElementsV2 = function (confirmDocumentFormId: string, params: object) {

    return instance.get(`/api/v2/confirm-document-forms/${confirmDocumentFormId}/elements`, { params })
        .then((res) => res)
        .catch((err) => err)
}

// 결재 문서 양식 조회 API
export const findConfirmForms = function (params: object) {
    return instance.get(`/admin/confirm-document-forms`, { params })
        .then((res) => res)
        .catch(() => alert('결재 서버와의 연결이 원활하지 않습니다. 관리자에게 문의하세요.'))
}

// 결재선 조회 API
export const getConfirmDocumentApporovalLine = function (confirmDocumentId: string) {
    return instance.get(`/api/confirm-documents/${confirmDocumentId}/approval-lines`)
        .then((res) => res)
        .catch(() => alert('결재 서버와의 연결이 원활하지 않습니다. 관리자에게 문의하세요.'))
}