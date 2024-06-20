import { Fragment } from "react/jsx-runtime";

interface ButtonProps {
    className: string;
    name?: string | number;
    onClick: () => void;
}

export default function Button({
    className = '',
    name = '',
    onClick = () => { }

}: ButtonProps) {
    return <Fragment>
        <button
            className={className}
            onClick={onClick} >{name}</button>
    </Fragment>
}