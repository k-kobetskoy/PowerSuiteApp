import { INodeProperty } from "./i-node-property";
import { IQueryNode } from "./i-query-node";

export abstract class QueryNode implements IQueryNode {
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
    nodeProperty: INodeProperty;

    constructor(nodeProperty: INodeProperty) {
        this.expandable = false;
        this.level = 0;
        this.visible = true;
        this.isExpanded = true;
        this.next = null;
        this.nodeProperty = nodeProperty;
    }
}
