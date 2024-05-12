import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyFilter } from "../tag-properties/tag-property-filter";

export class NodeFilter extends QueryNode {

    override tagProperties: TagPropertyFilter;
    
    constructor(tagProperties: TagPropertyFilter) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.FILTER;
        this.order = QueryNodeOrder.FILTER;
        this.type = QueryNodeType.FILTER;
        this.actions = QueryNodeActions.FILTER;        
    }
}
