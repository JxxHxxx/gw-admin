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
                <tr style={{'fontSize': '13px'}}>
                    {columns && columns.map((col) => <td key={col}>{col}</td>)}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>

    </Fragment>
}