import { BehaviorSubject } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";

export class TagPropertyConditionValue implements ITagProperties{
    
    readonly tagName: string = QueryNodeTags.VALUE;
    
    conditionNodeValue?: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
