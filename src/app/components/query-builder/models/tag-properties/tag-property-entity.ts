import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagPropertyType } from "../constants/tag-property-type";
import { TagProperty } from "../tag-property";

export class TagPropertyEntity implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ENTITY;

    entityName?: TagProperty<string>;
    entityAlias?: TagProperty<string>;
    default: { key: string; value: string; }[] = [];    

    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    constructor() {
        this.entityName = new TagProperty<string>(TagPropertyNames.entityName, TagPropertyType.STRING);
        this.entityAlias = new TagProperty<string>(TagPropertyNames.entityAlias, TagPropertyType.STRING);

        this.validProperties = {
            [TagPropertyNames.entityName]: this.entityName,
            [TagPropertyNames.entityAlias]: this.entityAlias
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
