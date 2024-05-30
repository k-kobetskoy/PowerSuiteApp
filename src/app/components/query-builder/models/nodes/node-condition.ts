import { Observable, combineLatest, mergeMap, iif, of } from "rxjs";
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

    override get displayValue$(): Observable<string> {

        let combined$ = combineLatest([
            this.tagProperties.conditionAttribute.value$,
            this.tagProperties.conditionOperator.value$,
            this.tagProperties.conditionValue.value$,
        ]);

        return combined$?.pipe(mergeMap(properties =>
            iif(() =>
                !properties[0] &&
                !properties[1] &&
                !properties[2],
                of(this.defaultDisplayValue), of(`
                ${properties[0] ? properties[0] : ''}
                ${properties[1] ? `(${properties[1]})` : ''}
                ${properties[2] ? properties[2] : ''}
                `))
        ));
    }

}