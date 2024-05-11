import { BehaviorSubject } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";

export class TagPropertyEntity implements ITagProperties {

    readonly tagName: string = QueryNodeTags.ENTITY;

    entityName:  BehaviorSubject<string> = new BehaviorSubject<string>(null);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
