export const DataverseEntityTypeNames = {
    entity: 'Entity', 
    attribute: 'Attribute',
    boolean: 'Boolean',
    picklist: 'picklist'
} as const;
export type DataverseEntityTypeNames = (typeof DataverseEntityTypeNames)[keyof typeof DataverseEntityTypeNames];
