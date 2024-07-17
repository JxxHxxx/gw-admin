import { Fragment } from "react/jsx-runtime";
import './list.css'
import { ReactNode } from "react";

interface ListProps {
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
}

export default function ListItemV2({
    className = '',
    children = <></>,
    onClick = () => { } }: ListProps) {
    return <Fragment>
        <li
            className={className}
            onClick={onClick}>
            {children}
        </li>
    </Fragment>
}