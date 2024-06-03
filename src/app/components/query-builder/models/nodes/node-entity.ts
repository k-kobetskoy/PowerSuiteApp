import { Observable, combineLatest, concatAll, iif, map, mergeMap, of } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyEntity } from "../tag-properties/tag-property-entity";

export class NodeEntity extends QueryNode {

    override tagProperties: TagPropertyEntity;

    constructor(tagProperties: ITagProperties) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.ENTITY;
        this.order = QueryNodeOrder.ENTITY;
        this.type = QueryNodeType.ENTITY;
        this.actions = QueryNodeActions.ENTITY;
    }

    override get displayValue$(): Observable<string> {
        let combined$ = combineLatest([
            this.tagProperties.entityName.value$,
            this.tagProperties.entityAlias.value$,
        ]);

        return combined$?.pipe(mergeMap(([entityName, entityAlias]) => {
            entityName = entityName? entityName.trim() : '';
            entityAlias = entityAlias? entityAlias.trim() : '';

            return iif(() => !entityName && !entityAlias,
                of(this.defaultDisplayValue),
                of(`${entityName ? entityName : ''} ${entityAlias ? `(${entityAlias})` : ''}`)
            );
        }));
    }
}
