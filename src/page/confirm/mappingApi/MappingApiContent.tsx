import { useState } from "react";
import Button from "../../../component/button/Button";
import MainContainer from "../../../component/container/MainContainer";
import Title from "../../../component/text/Title";
import HorizontalMenu from "../../../component/division/HorizontalMenu";
import "../../../component/pagination/pagination.css";
import MappingApiList from "./MappingApiList";
import MappingApiHelpModal from "./MappingApiHelpModal";
import MappingApiCreateModal from "./MappingApiCreateModal";

export default function MappingApiContent() {
    const [addRestApiConnectionModalOpen, setAddRestApiConnectionModalOpen] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);

    return <MainContainer>
        <Title id="confirmDocumentMappingApiTitle"
            name="결재 문서 API 연동" />
        <HorizontalMenu>
            <Button className="cfc bs"
                name='결재 문서에 API 연동하기'
                onClick={() => setAddRestApiConnectionModalOpen(true)} />
            <MappingApiCreateModal
                isOpen={addRestApiConnectionModalOpen}
                setIsOpen={setAddRestApiConnectionModalOpen} />
            <Button className="cfc bs"
                name="HELP"
                onClick={() => setHelpModalOpen(true)} />
            <MappingApiHelpModal
                helpModalOpen={helpModalOpen}
                setHelpModalOpen={setHelpModalOpen} />
        </HorizontalMenu>
        <div style={{ borderBottom: '1px solid gray' }}></div>
        <MappingApiList />
    </MainContainer >
}