import { ReactNode } from "react"

interface InLineBlockWrapperState {
    id?: string;
    className?: string;
    marginRight?: string;
    marginLeft?: string;
    children: ReactNode;
}

export default function InLineBlockWrapper({
    id,
    className,
    marginRight = '',
    marginLeft = '',
    children }: InLineBlockWrapperState) {

    return <div id={id}
        className={className}
        style={{
            'display': 'inline-block',
            'marginRight': marginRight ? marginRight : '',
            'marginLeft': marginLeft ? marginLeft : ''
        }}>
        {children}
    </div>
}