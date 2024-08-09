
import axios from 'axios';

interface VacationApi {
    addCommonVacation: () => object;
    updateCommonVacation: () => object;
}

const createAxiosInstance = (baseURL = '') => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 3000,
        withCredentials: true
    });

    return instance
}

const instance = createAxiosInstance('http://localhost:8080')


const addCommonVacation = () => {
    return instance.post(`/admin/vacations/set-common-vacation`)
        .then((res) => res)
        .catch((err) => alert(err))
};
const updateCommonVacation = () => {
    return instance.patch(`/admin/vacations/update-common-vacation`)
        .then((res) => res)
        .catch((err) => alert(err))

};
export const VacationApi:VacationApi = {
    addCommonVacation,
    updateCommonVacation
};

