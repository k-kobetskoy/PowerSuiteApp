import { BehaviorSubject } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";

export class TagPropertyRoot implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ROOT;

    top: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    distinct: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    noLock: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    aggregate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    totalRecordsCount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    lateMaterialize: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    pageSize: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    page: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    pagingCookie: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    dataSource: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
