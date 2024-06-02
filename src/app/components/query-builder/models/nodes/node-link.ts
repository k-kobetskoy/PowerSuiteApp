import { Observable, combineLatest, mergeMap, iif, of } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyLink } from "../tag-properties/tag-property-link";

export class NodeLink extends QueryNode {

    override tagProperties: TagPropertyLink;

    constructor(tagProperties: TagPropertyLink) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.LINK;
        this.order = QueryNodeOrder.LINK;
        this.type = QueryNodeType.LINK;
        this.actions = QueryNodeActions.LINK;
    }

    override get displayValue$(): Observable<string> {

        let combined$ = combineLatest([
            this.tagProperties.linkEntity.value$,
            this.tagProperties.linkType.value$,
            this.tagProperties.linkAlias.value$,
            this.tagProperties.linkIntersect.value$
        ]);

        return combined$?.pipe(mergeMap(([entityName, linkType, linkAlias, intersect]) => {
            entityName = entityName ? entityName.trim() : '';
            linkAlias = linkAlias ? linkAlias.trim() : '';
            linkType = linkType? linkType.trim() : '';

            return iif(() => !entityName && !linkAlias && !linkType && !intersect,
                of(this.defaultDisplayValue),
                of(`${entityName ? entityName : ''} ${linkType? linkType: ''} ${intersect? 'M:M':''} ${linkAlias ? `(${linkAlias})` : ''}`)
            );
        }));
    }
}
