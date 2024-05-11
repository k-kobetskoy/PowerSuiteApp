import { INodeProperty } from "../abstract/i-node-property";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";

export class NodeSort extends QueryNode{

    constructor(nodeProperty: INodeProperty) {
        super(nodeProperty);
        this.defaultDisplayValue = QueryNodeType.ORDER;
        this.displayValue = QueryNodeType.ORDER;
        this.order = QueryNodeOrder.ORDER;
        this.type = QueryNodeType.ORDER;
        this.actions = QueryNodeActions.ORDER;        
    }    
}
