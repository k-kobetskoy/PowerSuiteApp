import { BehaviorSubject } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";

export class TagPropertyLink implements ITagProperties {

    readonly tagName: string = QueryNodeTags.LINK;

    relationship: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    linkEntity: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    fromAttribute: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    toAttribute: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    linkType: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    linkAlias: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    intersect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    vilible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    showAll: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
