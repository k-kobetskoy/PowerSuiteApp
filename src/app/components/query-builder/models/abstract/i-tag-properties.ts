import { BehaviorSubject } from "rxjs";

export interface ITagProperties {
    
    tagName: string;

    conditionNodeValue?: BehaviorSubject<string>;

    conditionEntity?: BehaviorSubject<string>;
    conditionAttribute?: BehaviorSubject<string>;
    conditionOperator?: BehaviorSubject<string>;
    conditionValue?: BehaviorSubject<string>;

    attributeName?: BehaviorSubject<string>;
    attributeAlias?: BehaviorSubject<string>;
    
    entityName?:  BehaviorSubject<string>;

    filterType?: BehaviorSubject<string>;
    isQuickFindFilter?: BehaviorSubject<boolean>;
    overrideRecordLimit?: BehaviorSubject<boolean>;

    relationship?: BehaviorSubject<string>;
    linkEntity?: BehaviorSubject<string>;
    fromAttribute?: BehaviorSubject<string>;
    toAttribute?: BehaviorSubject<string>;
    linkType?: BehaviorSubject<string>;
    linkAlias?: BehaviorSubject<string>;
    intersect?: BehaviorSubject<boolean>;
    vilible?: BehaviorSubject<boolean>;
    showAll?: BehaviorSubject<boolean>;

    top?: BehaviorSubject<number>;
    distinct?: BehaviorSubject<boolean>;
    noLock?: BehaviorSubject<boolean>;
    aggregate?: BehaviorSubject<boolean>;
    totalRecordsCount?: BehaviorSubject<boolean>;
    lateMaterialize?: BehaviorSubject<boolean>;
    pageSize?: BehaviorSubject<number>;
    page?: BehaviorSubject<number>;
    pagingCookie?: BehaviorSubject<string>;
    dataSource?: BehaviorSubject<string>;

    sortAttribute?: BehaviorSubject<string>;
    descending?: BehaviorSubject<boolean>;

    getOpeningTag(): string;
    getClosingTag(): string;
}
