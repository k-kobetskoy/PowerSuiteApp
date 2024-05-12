import { BehaviorSubject } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagProperty } from "../tag-property";

export class TagPropertyRoot implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ROOT;

    rootTop?: TagProperty<number> = new TagProperty<number>(TagPropertyNames.rootTop);
    rootDistinct?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.rootDistinct, false);
    rootAggregate?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.rootAggregate, false);
    rootTotalRecordsCount?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.rootTotalRecordsCount, false);
    rootLateMaterialize?: TagProperty<boolean> = new TagProperty<boolean>(TagPropertyNames.rootLateMaterialize, false);
    rootPageSize?: TagProperty<number> = new TagProperty<number>(TagPropertyNames.rootPageSize);
    rootPage?: TagProperty<number> = new TagProperty<number>(TagPropertyNames.rootPage);
    rootPagingCookie?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.rootPagingCookie);
    rootDataSource?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.rootDataSource);
    rootOptions?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.rootOptions);


    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
