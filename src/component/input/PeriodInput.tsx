import { format } from "date-fns/format";
import Input from "./Input";

const nowDate = format(new Date(), 'yyyy-MM-dd');

interface PeriodProp {
    startDateLabel?: string,
    endDateLabel?: string,
    startDatedefaultValue?: string,
    endDatedefaultValue?: string,
    onChangeStartDate: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onChangeEndDate: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PeriodInput({
    startDateLabel = '시작일자',
    endDateLabel = '종료일자',
    startDatedefaultValue = '',
    endDatedefaultValue = '',
    onChangeStartDate,
    onChangeEndDate
}: PeriodProp) {

    return <>
        <div style={{ 'display': 'inline-block' }}>
            <div>
                <label htmlFor="startDate"
                    style={{ 'fontSize': '12px', 'marginRight': '5px' }}>{startDateLabel}</label>
            </div>
            <Input
                id="startDate"
                className="bi_msg"
                type="date"
                defaultValue={startDatedefaultValue ? startDatedefaultValue : nowDate}
                onChange={onChangeStartDate} />

        </div>
        <div style={{ 'display': 'inline-block' }}>
            <div>
                <label htmlFor="endDate"
                    style={{ 'fontSize': '12px', 'marginRight': '5px' }}>{endDateLabel}</label>
            </div>
            <Input
                id="endDate"
                className="bi_msg"
                type="date"
                defaultValue={endDatedefaultValue ? endDatedefaultValue : nowDate}
                onChange={onChangeEndDate} />
        </div>
    </>
}