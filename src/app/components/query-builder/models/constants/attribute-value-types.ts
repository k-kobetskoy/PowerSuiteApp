export const AttributeValueTypes = {
    string: 'string',
    boolean: 'bool',
    number: 'number',    
} as const;
export type AttributeValueTypes = (typeof AttributeValueTypes)[keyof typeof AttributeValueTypes];
