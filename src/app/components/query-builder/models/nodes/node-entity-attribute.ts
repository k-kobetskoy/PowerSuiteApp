import { Observable, combineLatest, distinctUntilChanged, mergeMap, of } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyEntityAttribute } from "../tag-properties/tag-property-entity-attribute";
import { IPropertyDisplay } from "../abstract/i-node-property-display";

export class NodeEntityAttribute extends QueryNode {

    override tagProperties: TagPropertyEntityAttribute;

    constructor(tagProperties: TagPropertyEntityAttribute) {
        super(tagProperties);
        this.defaultNodeDisplayValue = QueryNodeType.ATTRIBUTE;
        this.order = QueryNodeOrder.ATTRIBUTE;
        this.type = QueryNodeType.ATTRIBUTE;
        this.actions = QueryNodeActions.ATTRIBUTE;
    }

    override get displayValue$(): Observable<IPropertyDisplay> {

        const combined$ = combineLatest([
            this.tagProperties.attributeName.value$,
            this.tagProperties.attributeAlias.value$,
            this.tagProperties.attributeAggregate.value$,
            this.tagProperties.attributeGroupBy.value$,
            this.tagProperties.attributeDistinct.value$,
            this.tagProperties.attributeUserTimeZone.value$,
            this.tagProperties.attributeDateGrouping.value$
        ]);

        return combined$.pipe(
            mergeMap(([attributeName, attributeAlias, attributeAggregate, attributeGroupBy, attributeDistinct, attributeUserTimeZone, attributeDateGrouping]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue,
                    tagPropertyDisplay: this.tagProperties.tagName
                };

                const tagDisplay = attributeName || attributeAlias || attributeAggregate || attributeGroupBy || attributeDistinct || attributeUserTimeZone || attributeDateGrouping;
                const nodeDisplay = attributeName || attributeAlias || attributeGroupBy;

                const aggregateString = attributeAggregate ? attributeAggregate : '';
                const groupByString = attributeGroupBy ? attributeGroupBy.toString() : '';
                const distinctString = attributeDistinct ? attributeDistinct.toString() : '';
                const userTimeZoneString = attributeUserTimeZone ? attributeUserTimeZone.toString() : '';
                const dateGroupingString = attributeDateGrouping ? attributeDateGrouping : '';

                if (tagDisplay) {
                    if (nodeDisplay) {
                        propertyDisplay.nodePropertyDisplay = attributeGroupBy
                            ? `${attributeAlias ? attributeAlias : ''}=count(${attributeName}) ${this.tagProperties.attributeGroupBy.nodePropertyDisplay}`
                            : `${attributeName ? attributeName : ''} ${attributeAlias ? `(${attributeAlias})` : ''}`.trim();
                    }
                    propertyDisplay.tagPropertyDisplay = `${this.tagProperties.tagName} 
                    ${attributeName? `${this.tagProperties.attributeName.name}="${attributeName}"` : ''} 
                    ${attributeAlias? `${this.tagProperties.attributeAlias.name}="${attributeAlias}"` : ''} 
                    ${aggregateString? `${this.tagProperties.attributeAggregate.name}="${aggregateString}"` : ''}
                    ${groupByString? `${this.tagProperties.attributeGroupBy.name}="${groupByString}"` : ''} 
                    ${distinctString? `${this.tagProperties.attributeDistinct.name}="${distinctString}"` : ''} 
                    ${userTimeZoneString? `${this.tagProperties.attributeUserTimeZone.name}="${userTimeZoneString}"` : ''} 
                    ${dateGroupingString? `${this.tagProperties.attributeDateGrouping.name}="${dateGroupingString}"` : ''}`.trim();
                }

                return of(propertyDisplay);
            }),
            distinctUntilChanged());
    }
}
