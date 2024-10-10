export const AttributeNames = {
    
    conditionEntity: 'entityname',
    conditionAttribute: 'attribute',
    conditionOperator: 'operator',
    conditionValue: 'value',
    conditionValueOf: 'valueof',

    attributeName: 'name',
    attributeAlias: 'alias',
    attributeAggregate: 'aggregate',
    attributeGroupBy: 'groupby',
    attributeDistinct: 'distinct',
    attributeUserTimeZone: 'usertimezone',
    attributeDateGrouping: 'dategrouping',

    entityName: 'name',
    entityAlias: 'alias',

    filterType: 'type',
    filterIsQuickFind: 'isquickfindfields',
    filterOverrideRecordLimit: 'overridequickfindrecordlimitenabled',
    filterBypassQuickFind: 'overridequickfindrecordlimitdisabled',

    linkEntity: 'name',
    linkFromAttribute: 'from',
    linkToAttribute: 'to',
    linkType: 'link-type',
    linkAlias: 'alias',
    linkIntersect: 'intersect',
    linkVisible: 'visible',
    linkShowOnlyLoolups: 'showonlylookups',

    rootTop: 'top',
    rootDistinct: 'distinct',
    rootAggregate: 'aggregate',
    rootTotalRecordsCount: 'returntotalrecordcount',
    rootLateMaterialize: 'latematerialize',
    rootRecordsPerPage: 'count',
    rootPage: 'page',
    rootPagingCookie: 'paging-cookie',
    rootDataSource: 'datasource',
    rootOptions: 'options',

    orderAttribute: 'attribute',
    orderDescending: 'descending',
    orderAlias: 'alias',

} as const;
export type AttributeNames = (typeof AttributeNames)[keyof typeof AttributeNames];
