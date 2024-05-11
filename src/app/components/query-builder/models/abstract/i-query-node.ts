import { INodeProperty } from "./i-node-property";

export interface IQueryNode {
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
    nodeProperties: INodeProperty[]
}
