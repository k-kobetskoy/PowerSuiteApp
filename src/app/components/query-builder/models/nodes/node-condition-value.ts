import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";

export class NodeConditionValue  extends QueryNode{

    constructor(tagProperties: ITagProperties) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.VALUE;
        this.order = QueryNodeOrder.VALUE;
        this.type = QueryNodeType.VALUE;
        this.actions = QueryNodeActions.VALUE;
    }
}
