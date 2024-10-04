import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagPropertyType } from "../constants/tag-property-type";
import { TagProperty } from "../tag-property";

export class TagPropertyOrder implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ORDER;

    orderAttribute?: TagProperty<string>;
    orderDescending?: TagProperty<boolean>;
    orderAlias?: TagProperty<string>;
    default: { key: string; value: string; }[] = [];    


    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    constructor() {
        this.orderAttribute = new TagProperty<string>(TagPropertyNames.orderAttribute, TagPropertyType.STRING);
        this.orderDescending = new TagProperty<boolean>(TagPropertyNames.orderDescending, TagPropertyType.BOOLEAN, 'Desc', false);
        this.orderAlias = new TagProperty<string>(TagPropertyNames.orderAlias, TagPropertyType.STRING);

        this.validProperties = {
            [TagPropertyNames.orderAttribute]: this.orderAttribute,
            [TagPropertyNames.orderDescending]: this.orderDescending,
            [TagPropertyNames.orderAlias]: this.orderAlias
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
