import Button from "../../../component/button/Button";
import Input from "../../../component/input/Input";
import { FiMoreVertical } from "react-icons/fi";

import '../../../component/card/card.css'
import { findConfirmForms, getConfirmDocumentFormElements } from "../../../api/ConfirmApi";
import { useEffect, useRef, useState } from "react";
import EmptyMsg from "../../../component/text/EmptyMsg";
import CreateConfirmFormModal from "./CreateConfirmFormModal";
import ConfirmPreviewModal from "./ConfirmPreviewModal";
import Title from "../../../component/text/Title";
import MainContainer from "../../../component/container/MainContainer";
import HorizontalMenu from "../../../component/division/HorizontalMenu";

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

interface ConfirmFormState {
    confirmDocumentFormPk: number,
    companyId: string,
    confirmDocumentFormId: string,
    confirmDocumentFormName: string,
    used: boolean,
    createTime: string
}

export default function ConfirmFormConfig() {
    // 랜더링을 위한 state
    const [render, setRender] = useState(false);
    // 결재 양식 state
    const [confirmForms, setConfirmForms] = useState<ConfirmFormState[]>([]);
    // 결재 템플릿 만들기 모달
    const [createFormModal, setCreateFormModal] = useState(false);
    // 결재 문서 미리보기 모달
    const [previewFormModal, setPreviewFormModal] = useState(false);
    const [previewFormTitle, setPreviewFormTitle] = useState('');

    const [formElements, setFormElements] = useState([]);
    const requestConfirmForm = async () => {
        const params = {
            companyId: '',
            formName: formNameRef.current
        }
        const { data } = await findConfirmForms(params);
        if (data.status === 200) {
            setConfirmForms(data.data);
        }
    }

    const formNameRef = useRef('');

    useEffect(() => {
        requestConfirmForm();
    }, [render])

    const handleOnSubmitSearchCond = (event: any) => {
        event.preventDefault();
        setRender(!render);
    }

    const handleOnChangeSearchCond = (event: any) => {
        formNameRef.current = event.target.value;

        if (formNameRef.current.length === 0) {
            setRender(!render);
        }
    }

    const handleClickModifyIcon = () => {
        alert('결재 문서 수정');
    }

    const handleClickCreateConfirmForm = () => {
        setCreateFormModal(true);
    }

    const handleClickConfirmPreview = async (title: string, confirmDocumentFormId: string, companyId: string) => {
        setPreviewFormModal(true);
        setPreviewFormTitle(title)

        const params = {
            companyId: companyId
        }

        const { data } = await getConfirmDocumentFormElements(confirmDocumentFormId, params);
        if (data.status === 200) {
            setFormElements(data.data);
        }
    }

    useEffect(() => {
        setFormElements([]);
    }, [previewFormModal])

    return <MainContainer>
        <div id="cfc_header">
            <Title id="confirmDocumentFormAdminTitle" name="양식 관리" />
            <HorizontalMenu>
                <Button className="cfc bs"
                    name='결재 템플릿 만들기'
                    onClick={handleClickCreateConfirmForm} />
            </HorizontalMenu>
        </div>
        <CreateConfirmFormModal isOpen={createFormModal} setIsOpen={setCreateFormModal} />
        <div style={{ margin: '30px' }} ></div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form
                onSubmit={handleOnSubmitSearchCond}>
                <Input className='input_wh350 ip_bgc ip_br' placeholder="양식 제목 검색" onChange={handleOnChangeSearchCond} />
            </form>
        </div>
        <div style={{ margin: '30px' }} ></div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px dashed gray',
        }}>
            {/* 6개보다 결과가 많으면 스크롤 적용, 아니면 미적용 */}
            {confirmForms.length > 0 ? (<ul className={confirmForms.length > 6 ? "card_container_b" : "card_container"}>
                {confirmForms.map((form) => {
                    return <>
                        <li key={form.confirmDocumentFormPk} className="card_item flex_card">
                            <div className="item_info">
                                <p style={{ margin: '0px' }}
                                    onClick={() => handleClickConfirmPreview(form.confirmDocumentFormName, form.confirmDocumentFormId, form.companyId)}>{form.confirmDocumentFormName}</p>
                                <p style={{ margin: '0px', fontSize: '12px', color: 'gray' }}
                                    onClick={() => handleClickConfirmPreview(form.confirmDocumentFormName, form.confirmDocumentFormId, form.companyId)}>{convertCompanyId(form.companyId)}</p>
                            </div>
                            <FiMoreVertical style={{ cursor: 'pointer' }}
                                size='1.3em'
                                className="fimore_icons"
                                onClick={handleClickModifyIcon} />
                        </li>
                    </>
                })}
            </ul>)
                : <div className="card_container"><EmptyMsg msg={['조건을 만족하는 결재 양식이 존재하지 않습니다.']} /></div>}
        </div>
        <ConfirmPreviewModal
            modalIsOpen={previewFormModal}
            setIsOpen={setPreviewFormModal}
            title={previewFormTitle}
            formElements={formElements} />
        <div style={{ margin: '30px' }} ></div>
    </MainContainer>
}