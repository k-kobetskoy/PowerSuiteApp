export const QueryNodeType = {
    VALUE: 'Value',
    ORDER: 'Order',
    ATTRIBUTE: 'Attribute',
    CONDITION: 'Condition',
    FILTER:  'Filter',
    LINK: 'Link Entity',
    ENTITY: 'Entity',
    ROOT: 'Root'
} as const;
export type QueryNodeType = (typeof QueryNodeType)[keyof typeof QueryNodeType];
