import { useState } from "react"

interface RadioDuoProps {
    radio1Name: string;
    radio2Name: string;
    checked: boolean;
    id?: string;
}

export default function RadioDuo({
    radio1Name = '사용',
    radio2Name = '사용안함',
    checked,
    id }: RadioDuoProps) {
    const [active, setActive] = useState(checked);

    const handleOnChange = () => {
        setActive(!active);
    };

    return <>
        <input id={id + 'Active'}
            type='radio'
            checked={active}
            onChange={handleOnChange} />
        <span>{radio1Name}</span>
        <input id={id + 'Inactive'}
            type='radio'
            checked={!active}
            onChange={handleOnChange} />
        <span>{radio2Name}</span>
    </>
}