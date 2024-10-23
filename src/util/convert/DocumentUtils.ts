
const convertDocumentType = (documentCode: string): string => {
    // 빈 값일 때 처리
    if (documentCode === null || documentCode === undefined) {
        documentCode = '';
    }

    switch (documentCode) {
        case 'WRK':
            return '작업 요청서';
        case 'VAC':
            return '휴가 신청서';
        case 'DCR':
            return '데이터 변경 요청서';
        default:
            return documentCode;
    }
}

const convertTriggerType = (triggerType: string): string => {
    switch (triggerType) {
        case 'FINAL_ACCEPT':
            return '최종 승인';
        case 'RAISE':
            return '상신';
        case 'REJECT':
            return '반려';
        default: 
            return triggerType;
    }
    return triggerType;
}

const DocumentUtils = {
    convertDocumentType,
    convertTriggerType
}

export default DocumentUtils;