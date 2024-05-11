export const QueryNodeTags = {
    VALUE: 'value',
    ORDER: 'order',
    ATTRIBUTE: 'attribute',
    CONDITION: 'condition',
    FILTER:  'filter',
    LINK: 'link-entity',
    ENTITY: 'entity',
    ROOT: 'fetch'
} as const;
export type QueryNodeTags = (typeof QueryNodeTags)[keyof typeof QueryNodeTags];
