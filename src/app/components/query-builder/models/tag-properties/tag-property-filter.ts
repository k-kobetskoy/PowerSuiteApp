import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagPropertyType } from "../constants/tag-property-type";
import { TagProperty } from "../tag-property";

export class TagPropertyFilter implements ITagProperties {

    readonly tagName: string = QueryNodeTags.FILTER;

    filterType?: TagProperty<string>;
    filterIsQuickFind?: TagProperty<boolean>;
    filterOverrideRecordLimit?: TagProperty<boolean>;
    filterBypassQuickFind?: TagProperty<boolean>;
    default: { key: string; value: string; }[] = [];    

    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    constructor() {
        this.filterType = new TagProperty<string>(TagPropertyNames.filterType, TagPropertyType.STRING);
        this.filterIsQuickFind = new TagProperty<boolean>(TagPropertyNames.filterIsQuickFind, TagPropertyType.BOOLEAN, '', false);
        this.filterOverrideRecordLimit = new TagProperty<boolean>(TagPropertyNames.filterOverrideRecordLimit, TagPropertyType.BOOLEAN, '', false);
        this.filterBypassQuickFind = new TagProperty<boolean>(TagPropertyNames.filterBypassQuickFind, TagPropertyType.BOOLEAN, '', false);

        this.validProperties = {
            [TagPropertyNames.filterType]: this.filterType,
            [TagPropertyNames.filterIsQuickFind]: this.filterIsQuickFind,
            [TagPropertyNames.filterOverrideRecordLimit]: this.filterOverrideRecordLimit,
            [TagPropertyNames.filterBypassQuickFind]: this.filterBypassQuickFind
        };
    };

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
