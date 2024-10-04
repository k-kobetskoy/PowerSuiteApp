import { TagContentType } from "@angular/compiler";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagProperty } from "../tag-property";
import { TagPropertyType } from "../constants/tag-property-type";

export class TagPropertyCondition implements ITagProperties {

    readonly tagName: string = QueryNodeTags.CONDITION;

    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    conditionEntity?: TagProperty<string>;
    conditionAttribute?: TagProperty<string>;
    conditionOperator?: TagProperty<string>;
    conditionValue?: TagProperty<string>;
    default: { key: string; value: string; }[] = [];

    constructor() {
        this.conditionEntity = new TagProperty<string>(TagPropertyNames.conditionEntity, TagPropertyType.STRING);
        this.conditionAttribute = new TagProperty<string>(TagPropertyNames.conditionAttribute, TagPropertyType.STRING);
        this.conditionOperator = new TagProperty<string>(TagPropertyNames.conditionOperator, TagPropertyType.STRING);
        this.conditionValue = new TagProperty<string>(TagPropertyNames.conditionValue, TagPropertyType.STRING);

        this.validProperties = {
            [TagPropertyNames.conditionEntity]: this.conditionEntity,
            [TagPropertyNames.conditionAttribute]: this.conditionAttribute,
            [TagPropertyNames.conditionOperator]: this.conditionOperator,
            [TagPropertyNames.conditionValue]: this.conditionValue
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
