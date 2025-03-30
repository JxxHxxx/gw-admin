

export default function HorizontalMenu({ children }) {

    return <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
        <div style={{ borderBottom: '1px solid gray' }}></div>
    </div>

}