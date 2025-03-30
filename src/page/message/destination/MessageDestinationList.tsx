import { useEffect, useState } from "react";
import { MessageDestinationContext } from "../../../context/PaginationContext";
import { MessageApi } from "../../../api/MessageApi";
import { PaginationContextProp } from "../../../component/pagination/Paginaton";

interface MessageDestination {
    destinationId: string
    destinationName: string
    connectionType: string
    used: boolean
}

export default function MessageDestinationList() {

    const [destinations, setDestinations] = useState<PaginationContextProp<MessageDestination>>({
        pageable: {
            pageNumber: 0
        },
        totalPages: 0,
        content: [],
    });

    const requestSearchMessageQDestination = async (params?: object) => {
        const { data, status } = await MessageApi.searchMessageQDestination(params);
        console.log('status', status, 'data', data);
        if (status === 200) {
            setDestinations(data);
        }

    }

    useEffect(() => {
        requestSearchMessageQDestination();
    }, []);


    return <MessageDestinationContext.Provider value={destinations}>
        {destinations.content.map(
            (destination) =>
                <div>
                    <div>목적지 서비스 ID : {destination.destinationId}</div>
                    <div>목적시 서비스 명 : {destination.destinationName}</div>
                    <div>연결 유형 : {destination.connectionType}</div>
                    <div>사용 여부 : {destination.used === true ? '사용' : '미사용'}</div>
                </div>
        )}
    </MessageDestinationContext.Provider>
}