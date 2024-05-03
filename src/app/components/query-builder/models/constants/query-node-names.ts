export const QueryNodeNames = {
    VALUE: '(value)',
    ORDER: '(order)',
    ATTRIBUTE: '(attribute)',
    CONDITION: '(condition)',
    FILTER:  '(filter)',
    LINK: '(link entity)',
    ENTITY: '(entity)',
    ROOT: 'Root'
} as const;
export type QueryNodeNames = (typeof QueryNodeNames)[keyof typeof QueryNodeNames];
