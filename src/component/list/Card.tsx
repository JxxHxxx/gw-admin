import { ReactNode } from "react";

interface CardProp {
    children: ReactNode
    id?: string
    className?: string
    style?: object
}

const defaultStyle = {
    listStyle: 'none',
    width: '628px',
    padding: '10px',
    border: '1px solid rgb(216, 216, 216)',
    borderRadius: '5px',
    marginBottom: '15px'
}

export default function Card({
    children,
    id = '',
    className = '',
    style = defaultStyle }: CardProp) {

    return <>
        <li id={id}
            className={className}
            style={style}>
            {children}
        </li>
    </>

}