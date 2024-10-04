import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagPropertyType } from "../constants/tag-property-type";
import { TagProperty } from "../tag-property";

export class TagPropertyRoot implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ROOT;

    rootTop?: TagProperty<number>;
    rootDistinct?: TagProperty<boolean>;
    rootAggregate?: TagProperty<boolean>;
    rootTotalRecordsCount?: TagProperty<boolean>;
    rootLateMaterialize?: TagProperty<boolean>;
    rootPageSize?: TagProperty<number>;
    rootPage?: TagProperty<number>;
    rootPagingCookie?: TagProperty<string>;
    rootDataSource?: TagProperty<string>;
    rootOptions?: TagProperty<string>;
    default: { key: string; value: string; }[] = [];    


    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    constructor(){
        this.rootTop = new TagProperty<number>(TagPropertyNames.rootTop, TagPropertyType.NUMBER, 'Top');
        this.rootDistinct = new TagProperty<boolean>(TagPropertyNames.rootDistinct, TagPropertyType.BOOLEAN, 'Dst', false);
        this.rootAggregate = new TagProperty<boolean>(TagPropertyNames.rootAggregate, TagPropertyType.BOOLEAN, 'Agg', false);
        this.rootTotalRecordsCount = new TagProperty<boolean>(TagPropertyNames.rootTotalRecordsCount, TagPropertyType.BOOLEAN, 'Trc', false);
        this.rootLateMaterialize = new TagProperty<boolean>(TagPropertyNames.rootLateMaterialize, TagPropertyType.BOOLEAN, '', false);
        this.rootPageSize = new TagProperty<number>(TagPropertyNames.rootPageSize, TagPropertyType.NUMBER, 'PgSz');
        this.rootPage = new TagProperty<number>(TagPropertyNames.rootPage, TagPropertyType.NUMBER, 'Pg');
        this.rootPagingCookie = new TagProperty<string>(TagPropertyNames.rootPagingCookie, TagPropertyType.STRING);
        this.rootDataSource = new TagProperty<string>(TagPropertyNames.rootDataSource, TagPropertyType.STRING);
        this.rootOptions = new TagProperty<string>(TagPropertyNames.rootOptions, TagPropertyType.STRING);

        this.validProperties = {
            [TagPropertyNames.rootTop]: this.rootTop,
            [TagPropertyNames.rootDistinct]: this.rootDistinct,
            [TagPropertyNames.rootAggregate]: this.rootAggregate,
            [TagPropertyNames.rootTotalRecordsCount]: this.rootTotalRecordsCount,
            [TagPropertyNames.rootLateMaterialize]: this.rootLateMaterialize,
            [TagPropertyNames.rootPageSize]: this.rootPageSize,
            [TagPropertyNames.rootPage]: this.rootPage,
            [TagPropertyNames.rootPagingCookie]: this.rootPagingCookie,
            [TagPropertyNames.rootDataSource]: this.rootDataSource,
            [TagPropertyNames.rootOptions]: this.rootOptions
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
