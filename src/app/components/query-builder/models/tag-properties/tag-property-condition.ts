import { BehaviorSubject } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";

export class TagPropertyCondition implements ITagProperties {

    readonly tagName: string = QueryNodeTags.CONDITION;

    conditionEntity: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    conditionAttribute: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    conditionOperator: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    conditionValue: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
