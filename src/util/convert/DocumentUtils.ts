
const convertDocumentType = (documentCode: string) => {

    switch (documentCode) {
        case 'WRK':
            return '작업 요청서';
        case 'VAC':
            return '휴가 신청서';
        default:
            return documentCode;
    }
}


const DocumentUtils = {
    convertDocumentType
}

export default DocumentUtils;