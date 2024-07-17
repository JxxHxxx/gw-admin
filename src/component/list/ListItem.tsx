import { Fragment } from "react/jsx-runtime";
import './list.css'

interface ListProps {
    className?: string;
    content?: string;
    onClick?: () => void;
}

export default function ListItem({
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