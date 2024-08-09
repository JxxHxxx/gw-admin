import { VacationApi } from "../../../../api/VacationApi"
import RadioDuo from "../../../../component/input/RadioDuo"
import Select from "react-select";
import { Customers } from "../../../confirm/document/ConfirmDocumentContent";
import { useEffect, useState } from "react";
import { getCompanyCode } from "../../../../api/OrganizationApi";
import Button from "../../../../component/button/Button";
import Input from "../../../../component/input/Input";


export default function CommonVacationCreateContent() {

    const [companyCodes, setCompanyCodes] = useState<Customers[]>([{ companyId: '', companyName: '' }]);
    // 고객사 정보 - 회사명 selectOptions 랜더링 함수

    const requestCustomerInformation = async () => {
        const { data } = await getCompanyCode();
        if (data !== undefined) {
            setCompanyCodes(data);
        }
    }
    //계열사 코드
    const companyOptions = () => companyCodes.map(c => ({ value: c.companyId, label: c.companyName }));


    const handleAddCommonVacation = (event) => {
        event.preventDefault();
        alert('공동 연차 등록 처리')
    }

    useEffect(() => {
        requestCustomerInformation();
    }, [])

    return <>
        <span id="cfd_title" style={{ fontSize: '24px', fontWeight: 'bold' }}>공동 연차 지정</span>
        <div style={{ marginBottom: '30px' }}></div>
        <div id="container" style={{ width: '600px', border: '1px dashed blue' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid black'
            }}>
                <div>
                    <p style={{ fontSize: '12px' , margin : '0px'}}>공동 연차 지정</p>
                </div>
                <div>
                    <Button
                        className='btn_vac'
                        name='등록'
                        onClick={() => alert('등록!')} />
                </div>
            </div>
            <div style={{ display: 'inline-block' }}>
                <label htmlFor="company_choice" style={{ 'fontSize': '12px' }}>고객사 선택</label>
                <Select
                    id="company_choice"
                    styles={{
                        control: (base) => ({
                            ...base,
                            width: 200,
                            fontSize: '12px'
                        }),
                    }}
                    placeholder='고객사'
                    options={companyOptions()} />
            </div>
            <div style={{ marginBottom: '30px' }}></div>
            <div id="vacationRadioOptions" style={{ fontFamily: 'S-CoreDream-3Light' }}>
                <div style={{ marginBottom: '10px' }}>
                    <span>공동 연차 차감 여부</span>
                    <RadioDuo
                        radio1Name='Y'
                        radio2Name='N'
                        checked={true} />
                </div>
                <div>
                    <span>결재 필요 여부</span>
                    <RadioDuo
                        radio1Name='Y'
                        radio2Name='N'
                        checked={true} />
                </div>
            </div>
        </div>
    </>
}