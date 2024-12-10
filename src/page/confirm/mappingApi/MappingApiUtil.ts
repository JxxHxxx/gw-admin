export interface MappingApiPathVariable {
    key: string;
    value: string;
    valueType: string;
}

const extractPathVariable = (path:string):MappingApiPathVariable[] => {
    const pathVariableKeyRegex = /{([^}]+)}/g;
    const matches:MappingApiPathVariable[] = [];

    let match;
    while((match = pathVariableKeyRegex.exec(path))) {
        
        matches.push({
            key : match[1], 
            value : '', 
            valueType: ''})
    }
    console.log('mathces', matches);
    return matches;
}

const MappingApiUtil = {
    extractPathVariable
}

export default MappingApiUtil;