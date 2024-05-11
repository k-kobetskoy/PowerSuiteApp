import { BehaviorSubject } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";

export class TagPropertyFilter implements ITagProperties {

    readonly tagName: string = QueryNodeTags.FILTER;

    filterType?: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    isQuickFindFilter?: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    overrideRecordLimit?: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
