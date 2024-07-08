import { Fragment } from "react/jsx-runtime";

interface InputProps {
    className?: string;
    id?:string;
    name?:string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?:() => void;
    placeholder?: string;
    type?: string;
    minLegnth?: number;
    maxLength?: number;
    readOnly?: boolean;
    defaultValue?: string | number;
    disabled?:boolean;
}

export default function Input({
    className = '',
    id = '',
    name = '',
    onChange = () => { },
    onKeyDown= () => {},
    placeholder = '',
    type = 'text',
    minLegnth = 0,
    maxLength = 100,
    readOnly = false,
    defaultValue,
    disabled = false
}: InputProps) {
    return <Fragment>
        {disabled ? <input
            className={className}
            id={id}
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            minLength={minLegnth}
            maxLength={maxLength}
            readOnly={readOnly}
            type={type}
            defaultValue={defaultValue} 
            disabled
            /> : 
            <input
            className={className}
            id={id}
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            minLength={minLegnth}
            maxLength={maxLength}
            readOnly={readOnly}
            type={type}
            defaultValue={defaultValue} 
            />}
    </Fragment>
}