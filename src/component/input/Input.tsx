import { Fragment } from "react/jsx-runtime";

interface InputProps {
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}

export default function Input({
    className = '',
    onChange = () => { },
    placeholder = '',
    type = 'text'
}: InputProps) {
    return <Fragment>
        <input
            className={className}
            onChange={onChange}
            placeholder={placeholder}
            type={type} />
    </Fragment>
}