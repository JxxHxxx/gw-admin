

interface EmptyMsgProps {
    msg: string[]
}

export default function EmptyMsg({ msg = [] }: EmptyMsgProps) {
    return <>
        {msg.map((m, index) => <p key={'err_msg' + index} className='fade-in-text'
            style={{ 'fontSize': '14px', 'color': 'gray', 'margin': '0px' }}>{m}<br /></p>)}
    </>
}