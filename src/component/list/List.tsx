import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";
import './list.css'

interface ListGroupProps {
    children?: ReactNode;
    className?: string;
}

export default function List({
    children,
    className = '' }: ListGroupProps) {

    return <Fragment>
        <ul className={className}>
            {children}
        </ul>
    </Fragment>
}