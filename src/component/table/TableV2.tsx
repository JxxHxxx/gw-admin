interface ColumnsProp {
    key : string
}

interface TableProps<T> {
    columns: string[]
    data: T[]
    className?: string
}

export default function TableV2<T extends object>({ columns, data, className }: TableProps<T>) {    
    return <>
        <table className={className ? className : "table_bs"}>
            <thead>
                <tr>
                    {columns && columns.map((col) => <td style={{minWidth : '150px'}} key={col}>{col}</td>)}
                </tr>
            </thead>
            <tbody>
                {data.map(d => <tr>
                    {Object.entries(d).map(k => {
                        if(typeof(k[1]) === "object") {
                            return <></>
                        }
                        if(typeof(k[1]) === "boolean") {
                            return <td key={k[0]}>{k[1].toString()}</td>
                        }
                        else {
                            return <td key={k[0]}>{k[1]}</td>
                        }
                    })}
                </tr>)}
            </tbody>
        </table>
    </>
}