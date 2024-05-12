import { Observable, combineLatest, iif, mergeMap, of } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyEntityAttribute } from "../tag-properties/tag-property-entity-attribute";

export class NodeEntityAttribute extends QueryNode {

    override tagProperties: TagPropertyEntityAttribute;

    constructor(tagProperties: TagPropertyEntityAttribute) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.ATTRIBUTE;
        this.order = QueryNodeOrder.ATTRIBUTE;
        this.type = QueryNodeType.ATTRIBUTE;
        this.actions = QueryNodeActions.ATTRIBUTE;        
    }

    override get displayValue$(): Observable<string> {

        let combined$ = combineLatest([
            this.tagProperties.attributeName.value$,
            this.tagProperties.attributeAlias.value$,
        ]);

        return combined$?.pipe(mergeMap(properties =>
            iif(() =>
                !properties[0] &&
                !properties[1],
                of(this.defaultDisplayValue), of(`               
                ${properties[0] ? properties[0] : ''}
                ${properties[1] ? `(${properties[1]})` : ''}`))
        ));
    }
}
