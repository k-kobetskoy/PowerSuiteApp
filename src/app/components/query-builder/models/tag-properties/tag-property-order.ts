import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { AttributeNames } from "../constants/attribute-names";
import { AttributeValueTypes } from "../constants/attribute-value-types";
import { TagProperty } from "../tag-property";

export class TagPropertyOrder implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ORDER;

    orderAttribute?: TagProperty<string>;
    orderDescending?: TagProperty<boolean>;
    orderAlias?: TagProperty<string>;
    default: { key: string; value: string; }[] = [];    


    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    constructor() {
        this.orderAttribute = new TagProperty<string>(AttributeNames.orderAttribute, AttributeValueTypes.STRING);
        this.orderDescending = new TagProperty<boolean>(AttributeNames.orderDescending, AttributeValueTypes.boolean, 'Desc', false);
        this.orderAlias = new TagProperty<string>(AttributeNames.orderAlias, AttributeValueTypes.STRING);

        this.validProperties = {
            [AttributeNames.orderAttribute]: this.orderAttribute,
            [AttributeNames.orderDescending]: this.orderDescending,
            [AttributeNames.orderAlias]: this.orderAlias
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
