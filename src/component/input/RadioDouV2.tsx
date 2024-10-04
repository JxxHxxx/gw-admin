
interface RadioDouProp {
    checkedValue:boolean,
    onChangeY:() => void,
    onChangeN:() => void,
    id?:string
}

export default function RadioDuoV2({
    checkedValue,
    onChangeY,
    onChangeN,
    id
}: RadioDouProp) {


    return <>
        <input id={id + "Active"}
            type='radio'
            checked={checkedValue}
            onChange={onChangeY}
        />
        <span>Y</span>
        <input id={id + "inactive"}
            type='radio'
            checked={!checkedValue}
            onChange={onChangeN}
        />
        <span>N</span></>
}