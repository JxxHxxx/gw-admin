

export default function InLineBlockWrapper({
    marginRight = '',
    children }) {

    return <div style={{
        'display': 'inline-block',
        'marginRight': marginRight ? marginRight : ''
    }}>
        {children}
    </div>
}