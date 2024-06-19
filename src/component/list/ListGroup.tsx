import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

interface ListGroupProps {
    children?: ReactNode;
    className?: string;
}

export default function ListGroup({
    children,
    className = '' }: ListGroupProps) {

    return <Fragment>
        <ul className={className}>
            {children}
        </ul>
    </Fragment>
}