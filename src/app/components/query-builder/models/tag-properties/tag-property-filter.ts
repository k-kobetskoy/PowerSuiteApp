import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagProperty } from "../tag-property";

export class TagPropertyFilter implements ITagProperties {

    readonly tagName: string = QueryNodeTags.FILTER;

    filterType?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.filterType);
    filterIsQuickFind?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.filterIsQuickFind,'', false);
    filterOverrideRecordLimit?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.filterOverrideRecordLimit,'', false);
    filterBypassQuickFind?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.filterBypassQuickFind,'', false);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
