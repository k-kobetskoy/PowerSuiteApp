import { ITagProperty } from "./i-tag-property";

export interface ITagProperties {
    
    tagName: string;    

    conditionEntity?: ITagProperty<string>;
    conditionAttribute?: ITagProperty<string>;
    conditionOperator?: ITagProperty<string>;
    conditionValue?: ITagProperty<string>;
    conditionValueOf?: ITagProperty<string>;

    attributeName?: ITagProperty<string>;
    attributeAlias?: ITagProperty<string>;
    attributeAggregate?: ITagProperty<string>;
    attributeGroupBy?: ITagProperty<boolean>;
    attributeDistinct?: ITagProperty<boolean>;
    attributeUserTimeZone?: ITagProperty<boolean>;
    attributeDateGrouping?: ITagProperty<string>;
    
    entityName?:  ITagProperty<string>;
    entityAlias?:  ITagProperty<string>;

    filterType?: ITagProperty<string>;
    filterIsQuickFind?: ITagProperty<boolean>;
    filterOverrideRecordLimit?: ITagProperty<boolean>;
    filterBypassQuickFind?: ITagProperty<boolean>;

    linkEntity?: ITagProperty<string>;
    linkFromAttribute?: ITagProperty<string>;
    linkToAttribute?: ITagProperty<string>;
    linkType?: ITagProperty<string>;
    linkAlias?: ITagProperty<string>;
    linkIntersect?: ITagProperty<boolean>;
    linkVisible?: ITagProperty<boolean>;

    rootTop?: ITagProperty<number>;
    rootDistinct?: ITagProperty<boolean>;
    rootAggregate?: ITagProperty<boolean>;
    rootTotalRecordsCount?: ITagProperty<boolean>;
    rootLateMaterialize?: ITagProperty<boolean>;
    rootPageSize?: ITagProperty<number>;
    rootPage?: ITagProperty<number>;
    rootPagingCookie?: ITagProperty<string>;
    rootDataSource?: ITagProperty<string>;
    rootOptions?: ITagProperty<string>;

    orderAttribute?: ITagProperty<string>;
    orderDescending?: ITagProperty<boolean>;
    orderAlias?: ITagProperty<string>;

    getOpeningTag(): string;
    getClosingTag(): string;
}
