import { ReactNode } from "react";

interface TupleGroupProp {
    children: ReactNode
}

export default function TupleGroup({ children }: TupleGroupProp) {

    return <>
        <table className='table_bs'>
            {children}
        </table>
    </>
}