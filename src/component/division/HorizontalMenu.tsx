

export default function HorizontalMenu({ children }) {

    return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flex: 1,
            marginTop: '10px',
            marginBottom: '3px'
        }}>
            {children}
        </div>
    </div>
}