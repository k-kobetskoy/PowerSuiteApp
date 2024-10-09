import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { AttributeNames } from "../constants/attribute-names";
import { AttributeValueTypes } from "../constants/attribute-value-types";
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
        this.filterType = new TagProperty<string>(AttributeNames.filterType, AttributeValueTypes.STRING);
        this.filterIsQuickFind = new TagProperty<boolean>(AttributeNames.filterIsQuickFind, AttributeValueTypes.boolean, '', false);
        this.filterOverrideRecordLimit = new TagProperty<boolean>(AttributeNames.filterOverrideRecordLimit, AttributeValueTypes.boolean, '', false);
        this.filterBypassQuickFind = new TagProperty<boolean>(AttributeNames.filterBypassQuickFind, AttributeValueTypes.boolean, '', false);

        this.validProperties = {
            [AttributeNames.filterType]: this.filterType,
            [AttributeNames.filterIsQuickFind]: this.filterIsQuickFind,
            [AttributeNames.filterOverrideRecordLimit]: this.filterOverrideRecordLimit,
            [AttributeNames.filterBypassQuickFind]: this.filterBypassQuickFind
        };
    };

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
