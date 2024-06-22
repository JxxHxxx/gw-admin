import { Fragment } from "react/jsx-runtime";

interface InputProps {
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    minLegnth?: number;
    maxLength?: number;
}

export default function Input({
    className = '',
    onChange = () => { },
    placeholder = '',
    type = 'text',
    minLegnth = 0,
    maxLength = 100
}: InputProps) {
    return <Fragment>
        <input
            className={className}
            onChange={onChange}
            placeholder={placeholder}
            minLength={minLegnth}
            maxLength={maxLength}
            type={type} />
    </Fragment>
}