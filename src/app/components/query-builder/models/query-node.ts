import { ITagProperties } from "./abstract/i-tag-properties";
import { IQueryNode } from "./abstract/i-query-node";
import { Observable } from "rxjs";

export abstract class QueryNode implements IQueryNode {
    defaultDisplayValue: string;
    order: number;
    selfClosingTag: boolean;
    expandable: boolean;
    type: string;
    id?: string;
    actions?: string[];
    inputs?: string[];
    level?: number;
    isExpanded?: boolean;
    next?: IQueryNode | null;
    parent?: IQueryNode | null;
    visible: boolean;
    tagProperties: ITagProperties;

    constructor(tagProperties: ITagProperties) {
        this.expandable = false;
        this.level = 0;
        this.visible = true;
        this.isExpanded = true;
        this.next = null;
        this.tagProperties = tagProperties;
    }

    get displayValue$(): Observable<string> {
        return new Observable<string>(observer => {
            observer.next(this.defaultDisplayValue);
        });
    }
}
