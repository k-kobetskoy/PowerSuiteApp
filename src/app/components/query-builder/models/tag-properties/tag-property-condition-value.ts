import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeTags } from "../constants/query-node-tags";
import { TagProperty } from "../tag-property";

export class TagPropertyConditionValue implements ITagProperties{
    
    readonly tagName: string = QueryNodeTags.VALUE;
    default: { key: string; value: string; }[] = [];
    
    validProperties: { [key: string]: TagProperty<string | boolean | number> };
    
    validateTagPropertyName(propertyName: string): boolean{
        return true;
    };

    getTagPropertyByName(propertyName: string): TagProperty<string | boolean | number> | undefined{
        return undefined;
    }
}
