
export interface FormElement {
    elementGroupName: string,
    elementGroupKey: string,
    elementGroupType: string,
    elementGroupOrder: number,
    elements: Element[]
}

interface Element {
    elementName: string,
    elementOrder: number,
    elementKey: string
}


export default function OneConfirmContent({
    formElements,
    confirm
}: { formElements: FormElement[] }) {``

    // 페어 타입 랜더링
    const renderPair = (pairFormElement: FormElement) => (
        <table className='table_cfc'>
            <tbody>
                <tr id={pairFormElement.elementGroupKey}
                    style={{
                        fontSize: '15px',
                        textAlign: 'center',
                        backgroundColor: 'rgb(0, 40, 94)'
                    }}>
                    <td colSpan={2} style={{ color: 'white' }}>{pairFormElement.elementGroupName}</td>
                </tr>
                {pairFormElement.elements.map((element, index) => (
                    <tr key={index}>
                        <td style={{
                            width: '15%',
                            fontSize: '15px'
                        }}>{element.elementName}</td>
                        <td>{confirm.document.contents[element.elementKey]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // 테이블 타입 랜더링
    const renderTable = (tableFormElement: FormElement) => {
        const sortedElement = tableFormElement.elements.slice().sort((a, b) => a.elementOrder - b.elementOrder);
        // console.log('sortedElement', sortedElement)
        return <table className='table_cfc_tb'>
            <tbody>
                <tr style={{
                    fontSize: '15px',
                    backgroundColor: 'rgb(0, 40, 94)',
                    color: 'white'
                }}>
                    {sortedElement.map(element =>
                        <td style={{ textAlign: 'center' }}>{element.elementName}</td>
                    )}
                </tr>
                <tr>
                    {sortedElement.map(element =>
                        <td className='empty_row'></td>
                    )}
                </tr>
                <tr>
                    {sortedElement.map(element =>
                        <td className='empty_row'></td>
                    )}
                </tr>
            </tbody>
        </table>
    }

    const renderArray = (renderFormElement: FormElement) => {
        const sortedElement = renderFormElement.elements.slice().sort((a, b) => a.elementOrder - b.elementOrder);
        const colSpan = renderFormElement.elements.length + 1; // No 컬럼 생성으로 인해 + 1 

        return <table className='table_cfc_tb'>
            <tr id={renderFormElement.elementGroupKey} style={{ textAlign: 'center', backgroundColor: 'white' }}>
                <td colSpan={colSpan} style={{ color: 'rgb(0, 40, 94)' }}>{renderFormElement.elementGroupName}</td>
            </tr>
            <tr className='col'>
                <td style={{ textAlign: 'center' }}>No</td>
                {sortedElement.map(element =>
                    <td style={{ textAlign: 'center' }}>{element.elementName}</td>
                )}
            </tr>
            <tr>
                <td style={{ textAlign: 'center' }}>1</td>
                {sortedElement.map(element =>
                    <td className='empty_row'></td>
                )}
            </tr>
            <tr>
                <td style={{ textAlign: 'center' }}>2</td>
                {sortedElement.map(element =>
                    <td className='empty_row'></td>
                )}
            </tr>
        </table>
    }

    // 요소 그룹들을 정렬
    const sortElementGroup = (formElements: FormElement[]) => {
        const sortedFormElements = formElements.slice().sort((a, b) => a.elementGroupOrder - b.elementGroupOrder);
        // console.log('sortedFormElements', sortedFormElements)
        return sortedFormElements.map((formElement) => (<div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formElement.elementGroupName}</p>
            {(() => {
                switch (formElement.elementGroupType) {
                    case 'PAIR':
                        return renderPair(formElement);
                    case 'TABLE':
                        return renderTable(formElement);
                    case 'ARRAY':
                        return renderArray(formElement);

                }
            })()}
        </div>))
    }

    return sortElementGroup(formElements)

}