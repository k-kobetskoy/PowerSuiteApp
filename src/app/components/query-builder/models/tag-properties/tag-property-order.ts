import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagProperty } from "../tag-property";

export class TagPropertyOrder implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ORDER;

    orderAttribute?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.orderAttribute);
    orderDescending?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.orderDescending, 'Desc', false);
    orderAlias?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.orderAlias);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
