import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

import '../../component/table/table.css'

interface TableProps {
    columns: string[],
    rows: ReactNode
}

export default function Table({ columns, rows }: TableProps) {

    return <Fragment>
        <table className="table_bs">
            <thead>
                <tr>
                    {columns && columns.map((col) => <td>{col}</td>)}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>

    </Fragment>
}