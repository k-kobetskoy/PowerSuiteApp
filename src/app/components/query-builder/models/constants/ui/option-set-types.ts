export const FilterOperatorTypes = {
    NUMBER: 'Number',
    BOOLEAN: 'Boolean',    
    DATE_TIME: 'DateTime', 
    ID: 'Id',
    PICKLIST: 'Picklist',
    STRING: 'String',
} as const;
export type FilterOperatorTypes = (typeof FilterOperatorTypes)[keyof typeof FilterOperatorTypes];
