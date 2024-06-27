import { Fragment } from "react/jsx-runtime";

interface ButtonProps {
    style?: object;
    className?: string;
    name?: string | number;
    onClick: () => void;
}

export default function Button({
    className = '',
    name = '',
    style = {},
    onClick = () => { }

}: ButtonProps) {
    return <Fragment>
        <button
            style={style}
            className={className}
            onClick={onClick} >{name}</button>
    </Fragment>
}