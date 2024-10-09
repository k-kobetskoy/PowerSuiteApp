import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { AttributeNames } from "../constants/attribute-names";
import { AttributeValueTypes } from "../constants/attribute-value-types";
import { TagProperty } from "../tag-property";

export class TagPropertyEntity implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ENTITY;

    entityName?: TagProperty<string>;
    entityAlias?: TagProperty<string>;
    default: { key: string; value: string; }[] = [];    

    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    constructor() {
        this.entityName = new TagProperty<string>(AttributeNames.entityName, AttributeValueTypes.STRING);
        this.entityAlias = new TagProperty<string>(AttributeNames.entityAlias, AttributeValueTypes.STRING);

        this.validProperties = {
            [AttributeNames.entityName]: this.entityName,
            [AttributeNames.entityAlias]: this.entityAlias
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
