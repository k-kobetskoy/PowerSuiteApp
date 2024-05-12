import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyOrder } from "../tag-properties/tag-property-order";

export class NodeOrder extends QueryNode{

    override tagProperties: TagPropertyOrder;

    constructor(tagProperties: TagPropertyOrder) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.ORDER;
        this.order = QueryNodeOrder.ORDER;
        this.type = QueryNodeType.ORDER;
        this.actions = QueryNodeActions.ORDER;        
    }    
}
