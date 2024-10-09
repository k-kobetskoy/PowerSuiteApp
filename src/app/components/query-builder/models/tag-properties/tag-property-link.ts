import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { AttributeNames } from "../constants/attribute-names";
import { AttributeValueTypes } from "../constants/attribute-value-types";
import { TagProperty } from "../tag-property";

export class TagPropertyLink implements ITagProperties {

    readonly tagName: string = QueryNodeTags.LINK;

    linkEntity?: TagProperty<string>;
    linkFromAttribute?: TagProperty<string>;
    linkToAttribute?: TagProperty<string>;
    linkType?: TagProperty<string>;
    linkAlias?: TagProperty<string>;
    linkIntersect?: TagProperty<boolean>;
    linkVisible?: TagProperty<boolean>;
    default: { key: string; value: string; }[] = [];    


    validProperties: { [key: string]: TagProperty<string | boolean | number> };

    constructor() {
        this.linkEntity = new TagProperty<string>(AttributeNames.linkEntity, AttributeValueTypes.STRING);
        this.linkFromAttribute = new TagProperty<string>(AttributeNames.linkFromAttribute, AttributeValueTypes.STRING);
        this.linkToAttribute = new TagProperty<string>(AttributeNames.linkToAttribute, AttributeValueTypes.STRING);
        this.linkType = new TagProperty<string>(AttributeNames.linkType, AttributeValueTypes.STRING);
        this.linkAlias = new TagProperty<string>(AttributeNames.linkAlias, AttributeValueTypes.STRING);
        this.linkIntersect = new TagProperty<boolean>(AttributeNames.linkIntersect, AttributeValueTypes.boolean, 'M:M', false);
        this.linkVisible = new TagProperty<boolean>(AttributeNames.linkVisible, AttributeValueTypes.boolean, '', false);

        this.validProperties = {
            [AttributeNames.linkEntity]: this.linkEntity,
            [AttributeNames.linkFromAttribute]: this.linkFromAttribute,
            [AttributeNames.linkToAttribute]: this.linkToAttribute,
            [AttributeNames.linkType]: this.linkType,
            [AttributeNames.linkAlias]: this.linkAlias,
            [AttributeNames.linkIntersect]: this.linkIntersect,
            [AttributeNames.linkVisible]: this.linkVisible
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
