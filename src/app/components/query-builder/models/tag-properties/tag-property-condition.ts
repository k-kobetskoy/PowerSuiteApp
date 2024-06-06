import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagPropertyNames } from "../constants/tag-property-names";
import { TagProperty } from "../tag-property";

export class TagPropertyCondition implements ITagProperties {

    readonly tagName: string = QueryNodeTags.CONDITION;

    conditionEntity?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.conditionEntity);
    conditionAttribute?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.conditionAttribute);
    conditionOperator?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.conditionOperator);
    conditionValue?: TagProperty<string> = new TagProperty<string>(TagPropertyNames.conditionValue);

    getOpeningTag(): string {
        throw new Error("Method not implemented.");
    }
    getClosingTag(): string {
        throw new Error("Method not implemented.");
    }
}
