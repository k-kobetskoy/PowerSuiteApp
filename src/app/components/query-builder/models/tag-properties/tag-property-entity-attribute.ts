import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagProperty } from "../tag-property";

export class TagPropertyEntityAttribute implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ATTRIBUTE;

    attributeName?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.attributeName);
    attributeAlias?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.attributeAlias);
    attributeAggregate?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.attributeAggregate);
    attributeGroupBy?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.attributeGroupBy);
    attributeDistinct?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.attributeDistinct);
    attributeUserTimeZone?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.attributeUserTimeZone);
    attributeDateGrouping?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.attributeDateGrouping);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
