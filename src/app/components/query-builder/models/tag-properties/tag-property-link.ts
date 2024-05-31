import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagProperty } from "../tag-property";

export class TagPropertyLink implements ITagProperties {

    readonly tagName: string = QueryNodeTags.LINK;

    linkEntity?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.linkEntity);
    linkFromAttribute?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.linkFromAttribute);
    linkToAttribute?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.linkToAttribute);
    linkType?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.linkType);
    linkAlias?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.linkAlias);
    linkIntersect?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.linkIntersect);
    linkVisible?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.linkVisible);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
