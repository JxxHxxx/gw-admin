import Button from "../../../component/button/Button";
import Input from "../../../component/input/Input";
import { FiMoreVertical } from "react-icons/fi";

import '../../../component/card/card.css'
import { findConfirmForms } from "../../../api/ConfirmApi";
import { useEffect, useState } from "react";
import EmptyMsg from "../../../component/text/EmptyMsg";
import CreateConfirmFormModal from "./CreateConfirmFormModal";
import ConfirmPreviewModal from "./ConfirmPreviewModal";

function convertCompanyId(companyId: string) {
    switch (companyId) {
        case 'JXX':
            return '제이주식회사'
        case 'SPY':
            return '스파이의료센터'
        case 'BNG':
            return '바바베이커리'
        default:
            return '공용'
    }
}

export default function ConfirmFormConfig() {

    const [confirmForms, setConfirmForms] = useState();
    const requestConfirmForm = async () => {
        const { data } = await findConfirmForms();
        if (data.status === 200) {
            setConfirmForms(data.data);
        }
    }

    useEffect(() => {
        requestConfirmForm();
    }, [])

    const handleSearchConfirmForm = (event: any) => {
        event.preventDefault();
        alert('검색 이벤트');
    }

    const handleClickModifyIcon = () => {
        alert('결재 문서 수정');
    }

    const handleClickConfirmForm = () => {
        alert('결재 문서 양식 미리보기')
    }
    const [createFormModal, setCreateFormModal] = useState(false);
    const handleClickCreateConfirmForm = () => {
        setCreateFormModal(true);
    }

    const [confirmPreviewFormModal, setConfirmPreviewFormModal] = useState(false);
    const handleClickConfirmPreview = () => {
        setConfirmPreviewFormModal(true);
    }

    return <>
        <div id="cfc_container_900" style={{ width: '900px', border: '1px dashed red' }}>
            <div id="cfc_header">
                <span id="cfc_title" style={{ fontSize: '24px', fontWeight: 'bold' }}>양식 관리</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flex: 1,
                        marginTop: '10px',
                        marginBottom: '3px'
                    }}>
                        <Button className="cfc bs"
                            name='결재 템플릿 만들기'
                            onClick={handleClickCreateConfirmForm} />
                    </div>
                </div>
            </div>
            <CreateConfirmFormModal modalIsOpen={createFormModal} setIsOpen={setCreateFormModal} />

            <div style={{ borderBottom: '1px solid gray' }}></div>
            <div style={{ margin: '30px' }} ></div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <form
                    onSubmit={handleSearchConfirmForm}>
                    <Input className='input_wh350 ip_bgc ip_br' placeholder="양식 제목 검색" />
                </form>
            </div>
            <div style={{ margin: '30px' }} ></div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px dashed gray',
            }}>
                <ul className="card_container_b">
                    {confirmForms ? confirmForms.map((form) => {
                        return <>
                            <li key={form.confirmDocumentFormPk} className="card_item flex_card">
                                <div>
                                    <p style={{ margin: '0px', cursor: 'pointer' }}
                                        onClick={handleClickConfirmPreview}>{form.confirmDocumentFormName}</p>
                                    <p style={{ margin: '0px', fontSize: '12px', color: 'gray', cursor: 'pointer' }}
                                        onClick={handleClickConfirmPreview}>{convertCompanyId(form.companyId)}</p>
                                </div>
                                <FiMoreVertical style={{cursor: 'pointer'}} size='1.3em' className="fimore_icons" onClick={handleClickModifyIcon} />
                            </li>
                        </>
                    }
                    ) : <EmptyMsg msg={['조건을 만족하는 결재 양식이 존재하지 않습니다.']} />}
                </ul>
            </div>
            <ConfirmPreviewModal modalIsOpen={confirmPreviewFormModal} setIsOpen={setConfirmPreviewFormModal} />

            <div style={{ margin: '30px' }} ></div>
        </div>
    </>
}