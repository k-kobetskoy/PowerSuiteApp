export const AttributeTreeViewDisplayStyle = {
    onlyName: 'onlyName',
    nameWithValue: 'nameWithValue',    
    onlyValue: 'onlyValue',    
    alias: 'alias',
    none: 'none',
} as const;
export type AttributeTreeViewDisplayStyle = (typeof AttributeTreeViewDisplayStyle)[keyof typeof AttributeTreeViewDisplayStyle];
