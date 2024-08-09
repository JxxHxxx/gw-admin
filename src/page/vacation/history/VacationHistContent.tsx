import { useEffect } from "react";
import { VacationApi } from "../../../api/VacationApi"


export default function VacationHistContent() {

    const callApi = () => {
        // const response = VacationApi.addCommonVacation();
    }

    useEffect(() => {
        callApi();
    },[]) 

    return <>
        <p>휴가 이력 콘텐츠</p>
    </>
} 