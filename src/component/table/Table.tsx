import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

import '../../component/table/table.css'

interface TableProps {
    columns: string[],
    rows: ReactNode,
    className?: string
}

export default function Table({ columns, rows, className }: TableProps) {

    return <Fragment>
        <table className={className ? className : "table_bs"}>
            <thead>
                <tr>
                    {columns && columns.map((col) => <td key={col}>{col}</td>)}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>

    </Fragment>
}