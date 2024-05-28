import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyCondition } from "../tag-properties/tag-property-condition";

export class NodeCondition extends QueryNode {

    override tagProperties: TagPropertyCondition;

    constructor(tagProperties: TagPropertyCondition) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.CONDITION;
        this.order = QueryNodeOrder.CONDITION;
        this.type = QueryNodeType.CONDITION;
        this.actions = QueryNodeActions.CONDITION;
    }
}