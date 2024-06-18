import { Fragment } from "react/jsx-runtime";

interface InputProps {
    className? :string;
    onChange? : (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function Input({
    className = '',
    onChange = () => {},
    placeholder = '',
}: InputProps) {
    return <Fragment>
        <input
            className={className}
            placeholder={placeholder}
            onChange={onChange} />
    </Fragment>
}