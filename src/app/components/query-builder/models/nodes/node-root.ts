import { INodeProperty } from "../abstract/i-node-property";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../abstract/query-node";

export class NodeRoot extends QueryNode {

    constructor(nodeProperty: INodeProperty) {
        super(nodeProperty);
        this.defaultDisplayValue = QueryNodeType.ROOT;
        this.displayValue = QueryNodeType.ROOT;
        this.order = QueryNodeOrder.ROOT;
        this.type = QueryNodeType.ROOT;
        this.actions = QueryNodeActions.ROOT;
        this.expandable = true;
    }
}
