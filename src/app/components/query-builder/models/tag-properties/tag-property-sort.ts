import { BehaviorSubject } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";

export class TagPropertySort implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ORDER;

    sortAttribute: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    descending: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
