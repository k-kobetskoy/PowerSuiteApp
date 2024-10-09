import { Observable } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyConditionValue } from "../tag-properties/tag-property-condition-value";
import { EntityServiceFactoryService } from "../../services/entity-service-factory.service";

export class NodeConditionValue  extends QueryNode{

    override tagProperties: TagPropertyConditionValue;

    constructor(tagProperties: TagPropertyConditionValue, entityServiceFactory: EntityServiceFactoryService) {
        super(tagProperties, entityServiceFactory);
        this.defaultNodeDisplayValue = QueryNodeType.VALUE;
        this.order = QueryNodeOrder.VALUE;
        this.name = QueryNodeType.VALUE;
        this.actions = QueryNodeActions.VALUE;
    }
}
