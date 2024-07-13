import { ReactNode } from "react"

interface InLineBlockWrapperState {
    marginRight?: string;
    marginLeft?: string;
    children: ReactNode;
}

export default function InLineBlockWrapper({
    marginRight = '',
    marginLeft = '',
    children }: InLineBlockWrapperState) {

    return <div style={{
        'display': 'inline-block',
        'marginRight': marginRight ? marginRight : '',
        'marginLeft': marginLeft ? marginLeft : ''
    }}>
        {children}
    </div>
}