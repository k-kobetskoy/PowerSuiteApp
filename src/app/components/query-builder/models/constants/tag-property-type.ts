export const TagPropertyType = {
    STRING: 'string',
    NUMBER: 'bool',
    BOOLEAN: 'number',    
} as const;
export type TagPropertyType = (typeof TagPropertyType)[keyof typeof TagPropertyType];
