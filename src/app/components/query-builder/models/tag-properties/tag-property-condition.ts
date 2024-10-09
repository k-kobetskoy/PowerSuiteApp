import { TagContentType } from "@angular/compiler";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { AttributeNames } from "../constants/attribute-names";
import { TagProperty } from "../tag-property";
import { AttributeValueTypes } from "../constants/attribute-value-types";

export class TagPropertyCondition implements ITagProperties {

    readonly tagName: string = QueryNodeTags.CONDITION;

    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    conditionEntity?: TagProperty<string>;
    conditionAttribute?: TagProperty<string>;
    conditionOperator?: TagProperty<string>;
    conditionValue?: TagProperty<string>;
    default: { key: string; value: string; }[] = [];

    constructor() {
        this.conditionEntity = new TagProperty<string>(AttributeNames.conditionEntity, AttributeValueTypes.STRING);
        this.conditionAttribute = new TagProperty<string>(AttributeNames.conditionAttribute, AttributeValueTypes.STRING);
        this.conditionOperator = new TagProperty<string>(AttributeNames.conditionOperator, AttributeValueTypes.STRING);
        this.conditionValue = new TagProperty<string>(AttributeNames.conditionValue, AttributeValueTypes.STRING);

        this.validProperties = {
            [AttributeNames.conditionEntity]: this.conditionEntity,
            [AttributeNames.conditionAttribute]: this.conditionAttribute,
            [AttributeNames.conditionOperator]: this.conditionOperator,
            [AttributeNames.conditionValue]: this.conditionValue
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
