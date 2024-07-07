import { Fragment } from "react/jsx-runtime";

interface ButtonProps {
    style?: object;
    className?: string;
    type?: string;
    name?: string | number;
    onClick: () => void;
}

export default function Button({
    className = 'bb',
    name = '',
    ref,
    type = 'button',
    style = {},
    onClick = () => { }

}: ButtonProps) {
    return <Fragment>
        <button
            ref={ref}
            style={style}
            type={type}
            className={className}
            onClick={onClick} >{name}</button>
    </Fragment>
}