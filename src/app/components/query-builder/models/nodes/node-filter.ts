import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";

export class NodeFilter extends QueryNode {
    
    constructor(nodeProperty: ITagProperties) {
        super(nodeProperty);
        this.defaultDisplayValue = QueryNodeType.FILTER;
        this.displayValue = QueryNodeType.FILTER;
        this.order = QueryNodeOrder.FILTER;
        this.type = QueryNodeType.FILTER;
        this.actions = QueryNodeActions.FILTER;        
    }
}
