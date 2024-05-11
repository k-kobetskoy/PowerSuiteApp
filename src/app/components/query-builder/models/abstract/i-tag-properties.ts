export interface ITagProperties {

    // Root properties
    top?: number;
    distinct?: boolean;
    noLock?: boolean;
    aggregate?: boolean;
    totalRecordsCount?: boolean;
    lateMaterialize?: boolean;
    pageSize?: number;
    page?: number;
    pagingCookie?: string;
    dataSource?: string;

    // Entity properties
    entityName?: string;

    // Entity Attribute properties
    attributeName?: string;
    attributeAlias?: string;

    // Filter properties
    filterType?: string;
    isQuickFindFilter?: boolean;
    overrideRecordLimit?: boolean;

    // Condition properties
    conditionEntity?: string;
    conditionAttribute?: string;
    conditionOperator?: string;
    conditionValue?: string;

    // Value properties
    conditionNodeValue?: string;

    // Sort properties
    sortAttribute?: string;
    descending?: boolean;

    // Link Entity properties
    relationship?: string;
    linkEntity?: string;
    fromAttribute?: string;
    toAttribute?: string;
    linkType?: string;
    linkAlias?: string;
    intersect?: boolean;
    vilible?: boolean;
    showAll?: boolean;

    getOpeningTag(): string;
    getClosingTag(): string;
}
