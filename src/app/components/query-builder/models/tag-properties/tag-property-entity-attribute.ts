import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { AttributeNames } from "../constants/attribute-names";
import { AttributeValueTypes } from "../constants/attribute-value-types";
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
        this.attributeName = new TagProperty<string>(AttributeNames.attributeName, AttributeValueTypes.STRING);
        this.attributeAlias = new TagProperty<string>(AttributeNames.attributeAlias, AttributeValueTypes.STRING);
        this.attributeAggregate = new TagProperty<string>(AttributeNames.attributeAggregate, AttributeValueTypes.STRING);
        this.attributeGroupBy = new TagProperty<boolean>(AttributeNames.attributeGroupBy, AttributeValueTypes.boolean, 'GrpBy');
        this.attributeDistinct = new TagProperty<boolean>(AttributeNames.attributeDistinct, AttributeValueTypes.boolean);
        this.attributeUserTimeZone = new TagProperty<boolean>(AttributeNames.attributeUserTimeZone, AttributeValueTypes.boolean);
        this.attributeDateGrouping = new TagProperty<string>(AttributeNames.attributeDateGrouping, AttributeValueTypes.STRING);

        this.validProperties = {
            [AttributeNames.attributeName]: this.attributeName,
            [AttributeNames.attributeAlias]: this.attributeAlias,
            [AttributeNames.attributeAggregate]: this.attributeAggregate,
            [AttributeNames.attributeGroupBy]: this.attributeGroupBy,
            [AttributeNames.attributeDistinct]: this.attributeDistinct,
            [AttributeNames.attributeUserTimeZone]: this.attributeUserTimeZone,
            [AttributeNames.attributeDateGrouping]: this.attributeDateGrouping,
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
