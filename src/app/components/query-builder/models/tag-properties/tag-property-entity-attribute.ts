import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagPropertyType } from "../constants/tag-property-type";
import { TagProperty } from "../tag-property";

export class TagPropertyEntityAttribute implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ATTRIBUTE;

    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    attributeName?: TagProperty<string>;
    attributeAlias?: TagProperty<string>;
    attributeAggregate?: TagProperty<string>;
    attributeGroupBy?: TagProperty<boolean>;
    attributeDistinct?: TagProperty<boolean>;
    attributeUserTimeZone?: TagProperty<boolean>;
    attributeDateGrouping?: TagProperty<string>;
    default: { key: string; value: string; }[] = [];

    constructor() {
        this.attributeName = new TagProperty<string>(TagPropertyNames.attributeName, TagPropertyType.STRING);
        this.attributeAlias = new TagProperty<string>(TagPropertyNames.attributeAlias, TagPropertyType.STRING);
        this.attributeAggregate = new TagProperty<string>(TagPropertyNames.attributeAggregate, TagPropertyType.STRING);
        this.attributeGroupBy = new TagProperty<boolean>(TagPropertyNames.attributeGroupBy, TagPropertyType.BOOLEAN, 'GrpBy');
        this.attributeDistinct = new TagProperty<boolean>(TagPropertyNames.attributeDistinct, TagPropertyType.BOOLEAN);
        this.attributeUserTimeZone = new TagProperty<boolean>(TagPropertyNames.attributeUserTimeZone, TagPropertyType.BOOLEAN);
        this.attributeDateGrouping = new TagProperty<string>(TagPropertyNames.attributeDateGrouping, TagPropertyType.STRING);

        this.validProperties = {
            [TagPropertyNames.attributeName]: this.attributeName,
            [TagPropertyNames.attributeAlias]: this.attributeAlias,
            [TagPropertyNames.attributeAggregate]: this.attributeAggregate,
            [TagPropertyNames.attributeGroupBy]: this.attributeGroupBy,
            [TagPropertyNames.attributeDistinct]: this.attributeDistinct,
            [TagPropertyNames.attributeUserTimeZone]: this.attributeUserTimeZone,
            [TagPropertyNames.attributeDateGrouping]: this.attributeDateGrouping,
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
