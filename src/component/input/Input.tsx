import { Fragment } from "react/jsx-runtime";

interface InputProps {
    className?: string;
    id?: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: () => void;
    placeholder?: string;
    type?: string;
    minLegnth?: number;
    maxLength?: number;
    readOnly?: boolean;
    defaultValue?: string | number;
    disabled?: boolean;
    style?: object;
}

export default function Input({
    className = '',
    id = '',
    name = '',
    onChange = () => { },
    onKeyDown = () => { },
    placeholder = '',
    type = 'text',
    minLegnth = 0,
    maxLength = 100,
    readOnly = false,
    defaultValue,
    disabled = false,
    style = {}
}: InputProps) {
    return <Fragment>
        {disabled ? <input
            style={style}
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
                style={style}
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