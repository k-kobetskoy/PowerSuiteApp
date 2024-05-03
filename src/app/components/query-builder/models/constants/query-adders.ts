export const QueryAdders = {
    ROOT_ADDER: 'root',
    FILTER_ADDER: 'filter',
} as const;
export type QueryAdders = (typeof QueryAdders)[keyof typeof QueryAdders];
