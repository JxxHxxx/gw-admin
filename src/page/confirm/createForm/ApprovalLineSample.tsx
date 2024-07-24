

export default function ApprovalLineSample() {
        return <>
            <table className='table_lnline'>
                <thead>
                    <tr>
                        <th>기안</th>
                        <th>검토</th>
                        <th>결정</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ fontWeight : 'bold'}}>
                        <td>김땡땡</td>
                        <td>이땡땡</td>
                        <td>박땡땡</td>
                    </tr>
                    <tr style={{ height: '60px' }}>
                        <td>기안</td>
                        <td>승인</td>
                        <td>승인</td>
                    </tr>
                    <tr style={{ color: 'gray' }}>
                        <td>07-21 10:20</td>
                        <td>07-22 11:35</td>
                        <td>07-22 14:18</td>
                    </tr>
                </tbody>
            </table>
        </>
}