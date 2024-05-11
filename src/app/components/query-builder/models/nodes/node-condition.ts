import { INodeProperty } from "../abstract/i-node-property";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";

export class NodeCondition extends QueryNode{

    constructor(nodeProperty: INodeProperty) {
        super(nodeProperty);
        this.defaultDisplayValue = QueryNodeType.CONDITION;
        this.displayValue = QueryNodeType.CONDITION;
        this.order = QueryNodeOrder.CONDITION;
        this.type = QueryNodeType.CONDITION;
        this.actions = QueryNodeActions.CONDITION;        
    }
}
