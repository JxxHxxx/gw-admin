import { Fragment } from "react/jsx-runtime";

interface ListProps {
    className?: string;
    content?: string;
    onClick?: () => void;
}

export default function List({
    className = '',
    content = '',
    onClick = () => { } }: ListProps) {
    return <Fragment>
        <li
            className={className}
            onClick={onClick}>
            {content}
        </li>
    </Fragment>
}