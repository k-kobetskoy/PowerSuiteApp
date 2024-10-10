export const AttributeTreeViewDisplayStyle = {
    onlyName: 'name',
    withValue: 'value',    
} as const;
export type AttributeTreeViewDisplayStyle = (typeof AttributeTreeViewDisplayStyle)[keyof typeof AttributeTreeViewDisplayStyle];
