import { Fragment } from "react/jsx-runtime";

interface InputProps {
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?:() => void;
    placeholder?: string;
    type?: string;
    minLegnth?: number;
    maxLength?: number;
    readOnly?: boolean;
    defaultValue?: string | number;
}

export default function Input({
    className = '',
    onChange = () => { },
    onKeyDown= () => {},
    placeholder = '',
    type = 'text',
    minLegnth = 0,
    maxLength = 100,
    readOnly = false,
    defaultValue
}: InputProps) {
    return <Fragment>
        <input
            className={className}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            minLength={minLegnth}
            maxLength={maxLength}
            readOnly={readOnly}
            type={type}
            defaultValue={defaultValue} />
    </Fragment>
}