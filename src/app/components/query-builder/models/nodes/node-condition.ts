import { Observable, combineLatest, distinctUntilChanged, mergeMap, of } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyCondition } from "../tag-properties/tag-property-condition";
import { IPropertyDisplay } from "../abstract/i-node-property-display";
import { EntityServiceFactoryService } from "../../services/entity-service-factory.service";

export class NodeCondition extends QueryNode {

    override tagProperties: TagPropertyCondition;

    constructor(tagProperties: TagPropertyCondition, entityServiceFactory: EntityServiceFactoryService) {
        super(tagProperties, entityServiceFactory);
        this.defaultNodeDisplayValue = QueryNodeType.CONDITION;
        this.order = QueryNodeOrder.CONDITION;
        this.type = QueryNodeType.CONDITION;
        this.actions = QueryNodeActions.CONDITION;
    }


    override get displayValue$(): Observable<IPropertyDisplay> {

        const combined$ = combineLatest([
            this.tagProperties.conditionAttribute.constructorValue$,
            this.tagProperties.conditionOperator.constructorValue$,
            this.tagProperties.conditionValue.constructorValue$,
        ]);

        return combined$.pipe(
            mergeMap(([conditionAttribute, conditionOperator, conditionValue]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue, 
                    tagPropertyDisplay: this.tagProperties.tagName
                };

                conditionValue = conditionValue === null ? '' : conditionValue.toString();

                const nothingToDisplay = !conditionAttribute && !conditionOperator && !conditionValue;

                if (!nothingToDisplay) {
                    propertyDisplay.nodePropertyDisplay = `${conditionAttribute ? conditionAttribute : ''}${conditionOperator ? ` (${conditionOperator})` : ''}${conditionValue ? ` ${conditionValue}` : ''}`;

                    propertyDisplay.tagPropertyDisplay = [
                        this.tagProperties.tagName,
                        conditionAttribute ? ` ${this.tagProperties.conditionAttribute.name}="${conditionAttribute}"` : '',
                        conditionOperator ? ` ${this.tagProperties.conditionOperator.name}="${conditionOperator}"` : '',
                        conditionValue ? ` ${this.tagProperties.conditionValue.name}="${conditionValue}"` : ''
                      ].filter(part => part).join('');
                }

                return of(propertyDisplay);
            }),
            distinctUntilChanged());
    }
}