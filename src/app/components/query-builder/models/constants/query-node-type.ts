export const QueryNodeType = {
    VALUE: 'value',
    ORDER: 'order',
    ATTRIBUTE: 'attribute',
    CONDITION: 'condition',
    FILTER:  'filter',
    LINK: 'link',
    ENTITY: 'entity',
    ROOT: 'root'
} as const;
export type QueryNodeType = (typeof QueryNodeType)[keyof typeof QueryNodeType];
