import { INodeProperty } from "./abstract/i-node-property";
import { IQueryNode } from "./abstract/i-query-node";

export class QueryNode implements IQueryNode {
    defaultDisplayValue: string;
    displayValue: string;
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
    nodeProperties: INodeProperty[];

    constructor(init?:Partial<QueryNode>) {
        this.expandable = false;
        this.level = 0;
        this.visible = true;
        this.isExpanded = true;
        this.next = null;
        Object.assign(this, init);
    }
}
