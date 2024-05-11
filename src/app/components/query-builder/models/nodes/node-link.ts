import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";

export class NodeLink  extends QueryNode{

    constructor(nodeProperty: ITagProperties) {
        super(nodeProperty);
        this.defaultDisplayValue = QueryNodeType.LINK;
        this.displayValue = QueryNodeType.LINK;
        this.order = QueryNodeOrder.LINK;
        this.type = QueryNodeType.LINK;
        this.actions = QueryNodeActions.LINK;        
    }
}
