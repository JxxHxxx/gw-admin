import { useEffect, useState } from "react";
import { MessageDestinationContext } from "../../../context/PaginationContext";
import { MessageApi } from "../../../api/MessageApi";
import { PaginationContextProp } from "../../../component/pagination/Paginaton";
import ReactPaginate from "react-paginate";
import Table from "../../../component/table/Table";
import TableV2 from "../../../component/table/TableV2";

interface MessageDestination {
    destinationId: string
    destinationName: string
    connectionType: string
    used: boolean
    createDateTime: string
}

export default function MessageDestinationList({ itemsPerPage }) {

    const [destinations, setDestinations] = useState<PaginationContextProp<MessageDestination>>({
        pageable: {
            pageNumber: 0
        },
        totalPages: 0,
        content: [],
    });

    const reorderedContent = destinations.content.map(({ 
        destinationId, 
        destinationName, 
        connectionType, 
        used, 
        createDateTime }) => ({
        destinationId,
        destinationName,
        connectionType,
        used,
        createDateTime
      }));

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

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // const currentItems = items.slice(itemOffset, endOffset);
    const currentItems = reorderedContent.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(reorderedContent.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % reorderedContent.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return <div>
        <TableV2 columns={["서비스 ID", "서비스 명", "목적지 유형", "사용 여부", "생성일시"]}
            data={currentItems} />
        <div style={{margin : '50px'}}></div>
        <ReactPaginate
            breakLabel="..."
            nextLabel=<span>{">"}</span>
            previousLabel=<span>{"<"}</span>
            pageClassName="pnli"
            nextClassName="pnli"
            previousClassName="pnli"
            pageLinkClassName="rpnA"
            nextLinkClassName="rpnA"
            previousLinkClassName="rpnA"
            activeLinkClassName="rpnAActive"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
        />
    </div>
}