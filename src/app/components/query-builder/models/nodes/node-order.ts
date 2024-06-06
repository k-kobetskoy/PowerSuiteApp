import { Observable, combineLatest, mergeMap, of, distinctUntilChanged } from "rxjs";
import { IPropertyDisplay } from "../abstract/i-node-property-display";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyOrder } from "../tag-properties/tag-property-order";

export class NodeOrder extends QueryNode {

    override tagProperties: TagPropertyOrder;

    constructor(tagProperties: TagPropertyOrder) {
        super(tagProperties);
        this.defaultNodeDisplayValue = QueryNodeType.ORDER;
        this.order = QueryNodeOrder.ORDER;
        this.type = QueryNodeType.ORDER;
        this.actions = QueryNodeActions.ORDER;
    }

    override get displayValue$(): Observable<IPropertyDisplay> {
        const combined$ = combineLatest([
            this.tagProperties.orderAttribute.value$,
            this.tagProperties.orderDescending.value$,
        ]);

        return combined$.pipe(
            mergeMap(([attributeName, descending]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue,
                    tagPropertyDisplay: this.tagProperties.tagName
                };

                const display = attributeName || descending;

                const descendingString = descending === null || descending === false ? '' : descending.toString();

                if (display) {
                    propertyDisplay.nodePropertyDisplay = `${attributeName ? attributeName : ''} ${descendingString ? `${this.tagProperties.orderDescending.nodePropertyDisplay}` : ''}`.trim();
                    propertyDisplay.tagPropertyDisplay = `${this.tagProperties.tagName} ${attributeName ? `${this.tagProperties.orderAttribute.name}="${attributeName}"` : ''} ${descending ? `${this.tagProperties.orderDescending.name}="${descending}"` : ''}`.trim();
                }

                return of(propertyDisplay);
            }),
            distinctUntilChanged());
    }
}
