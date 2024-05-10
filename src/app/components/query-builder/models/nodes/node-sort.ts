import { INodeProperty } from "../abstract/i-node-property";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../abstract/query-node";

export class NodeSort extends QueryNode{

    constructor(nodeProperty: INodeProperty) {
        super(nodeProperty);
        this.order = QueryNodeOrder.ORDER;
        this.type = QueryNodeType.ORDER;
        this.actions = QueryNodeActions.ORDER;        
    }    
}
