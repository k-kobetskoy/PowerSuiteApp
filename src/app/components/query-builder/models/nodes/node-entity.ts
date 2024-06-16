import { Observable, combineLatest, distinctUntilChanged, mergeMap, of } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyEntity } from "../tag-properties/tag-property-entity";
import { IPropertyDisplay } from "../abstract/i-node-property-display";

export class NodeEntity extends QueryNode {

    override tagProperties: TagPropertyEntity;

    constructor(tagProperties: ITagProperties) {
        super(tagProperties);
        this.defaultNodeDisplayValue = QueryNodeType.ENTITY;
        this.order = QueryNodeOrder.ENTITY;
        this.type = QueryNodeType.ENTITY;
        this.actions = QueryNodeActions.ENTITY;
    }

    override get displayValue$(): Observable<IPropertyDisplay> {
        const combined$ = combineLatest([
            this.tagProperties.entityName.value$,
            this.tagProperties.entityAlias.value$,
        ]);

        return combined$.pipe(
            mergeMap(([entityName, entityAlias]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue,
                    tagPropertyDisplay: this.tagProperties.tagName
                };

                const display = entityName || entityAlias;

                if(display) {
                    propertyDisplay.nodePropertyDisplay = `${entityName ? entityName :''}${entityAlias ? ` (${entityAlias})`:''}`.trim();
                    propertyDisplay.tagPropertyDisplay = `${this.tagProperties.tagName}${entityName?` ${this.tagProperties.entityName.name}="${entityName}"`:''}${entityAlias?` ${this.tagProperties.entityAlias.name}="${entityAlias}"`:''}`.trim();
                }

                return of(propertyDisplay);
            }),
            distinctUntilChanged());
    }
}
