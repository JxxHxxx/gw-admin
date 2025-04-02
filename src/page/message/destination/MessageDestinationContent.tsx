import { useState } from "react";
import Button from "../../../component/button/Button";
import MainContainer from "../../../component/container/MainContainer";
import HorizontalMenu from "../../../component/division/HorizontalMenu";
import DefaultModal from "../../../component/modal/DefaultModal";
import Title from "../../../component/text/Title";
import MessageDestinationList from "./MessageDestinationList";

export default function MessageDestinationContent() {
    const [destinationCreateModalisOpen, setDestinationCreateModalisOpen] = useState(false);

    return <>
        <MainContainer>
            <Title
                id="messageDestinationTitle"
                name="목적지 관리" />
            <HorizontalMenu>
                <Button name="목적지 등록"
                    className="cfc bs"
                    onClick={() => setDestinationCreateModalisOpen(true)} />
                <DefaultModal title="목적지 등록하기"
                isOpen={destinationCreateModalisOpen}
                    setIsOpen={setDestinationCreateModalisOpen}
                >
                    <div>
                        목적지 등록 양식 디자인
                    </div>
                </DefaultModal>
            </HorizontalMenu>
            <MessageDestinationList itemsPerPage={1}/>
        </MainContainer>

    </>
}