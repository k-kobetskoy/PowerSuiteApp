import { BehaviorSubject } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyLink } from "../tag-properties/tag-property-link";

export class NodeLink  extends QueryNode{

    override tagProperties: TagPropertyLink;

    constructor(tagProperties: TagPropertyLink) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.LINK;
        this.order = QueryNodeOrder.LINK;
        this.type = QueryNodeType.LINK;
        this.actions = QueryNodeActions.LINK;        
    }
}
