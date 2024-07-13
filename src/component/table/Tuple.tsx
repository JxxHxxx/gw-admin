import { ReactNode } from "react"

interface TupleProp {
    tupleKey: string;
    children: ReactNode;
}

export default function Tuple({ tupleKey, children }: TupleProp) {

    return <>
        <tr>
            <th style={{ 'border': '1px solid black', 'textAlign': 'left' }}>{tupleKey}</th>
            <td style={{ 'border': '1px solid black' }}>
                {children}
            </td>
        </tr>
    </>
}