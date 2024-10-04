import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagPropertyType } from "../constants/tag-property-type";
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
        this.linkEntity = new TagProperty<string>(TagPropertyNames.linkEntity, TagPropertyType.STRING);
        this.linkFromAttribute = new TagProperty<string>(TagPropertyNames.linkFromAttribute, TagPropertyType.STRING);
        this.linkToAttribute = new TagProperty<string>(TagPropertyNames.linkToAttribute, TagPropertyType.STRING);
        this.linkType = new TagProperty<string>(TagPropertyNames.linkType, TagPropertyType.STRING);
        this.linkAlias = new TagProperty<string>(TagPropertyNames.linkAlias, TagPropertyType.STRING);
        this.linkIntersect = new TagProperty<boolean>(TagPropertyNames.linkIntersect, TagPropertyType.BOOLEAN, 'M:M', false);
        this.linkVisible = new TagProperty<boolean>(TagPropertyNames.linkVisible, TagPropertyType.BOOLEAN, '', false);

        this.validProperties = {
            [TagPropertyNames.linkEntity]: this.linkEntity,
            [TagPropertyNames.linkFromAttribute]: this.linkFromAttribute,
            [TagPropertyNames.linkToAttribute]: this.linkToAttribute,
            [TagPropertyNames.linkType]: this.linkType,
            [TagPropertyNames.linkAlias]: this.linkAlias,
            [TagPropertyNames.linkIntersect]: this.linkIntersect,
            [TagPropertyNames.linkVisible]: this.linkVisible
        };
    }

    validateTagPropertyName(propertyName: string): boolean {
        return this.validProperties.hasOwnProperty(propertyName);
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined {
        return this.validProperties[propertyName];
    }
}
