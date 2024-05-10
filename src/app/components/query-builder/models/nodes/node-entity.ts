import { INodeProperty } from "../abstract/i-node-property";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../abstract/query-node";

export class NodeEntity extends QueryNode{

    constructor(nodeProperty: INodeProperty) {
        super(nodeProperty);
        this.order = QueryNodeOrder.ENTITY;
        this.type = QueryNodeType.ENTITY;
        this.actions = QueryNodeActions.ENTITY;        
    }
}
