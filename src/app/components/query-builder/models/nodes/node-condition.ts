import { TagPropertiesFactoryService } from "../../services/tag-properties-factory.service";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";

export class NodeCondition extends QueryNode {

    constructor(tagProperties: ITagProperties) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.CONDITION;
        this.order = QueryNodeOrder.CONDITION;
        this.type = QueryNodeType.CONDITION;
        this.actions = QueryNodeActions.CONDITION;
    }
}