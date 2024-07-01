import { Fragment } from "react/jsx-runtime";

interface ButtonProps {
    style?: object;
    className?: string;
    type?: string;
    name?: string | number;
    onClick: () => void;
}

export default function Button({
    className = '',
    name = '',
    type = 'button',
    style = {},
    onClick = () => { }

}: ButtonProps) {
    return <Fragment>
        <button
            style={style}
            type={type}
            className={className}
            onClick={onClick} >{name}</button>
    </Fragment>
}