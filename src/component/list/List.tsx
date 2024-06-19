import { Fragment } from "react/jsx-runtime";

interface ListProps {
    className?: string;
    content?: string;
}

export default function List({
    className = '',
    content = '' }: ListProps) {
    return <Fragment>
        <li className={className}>
            {content}
        </li>
    </Fragment>
}