import { Observable, mergeMap, iif, of, combineLatest } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyRoot } from "../tag-properties/tag-property-root";

export class NodeRoot extends QueryNode {

    override tagProperties: TagPropertyRoot;

    constructor(tagProperties: ITagProperties) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.ROOT;
        this.order = QueryNodeOrder.ROOT;
        this.type = QueryNodeType.ROOT;
        this.actions = QueryNodeActions.ROOT;
    }

    override get displayValue$(): Observable<string> {

        let combined$ = combineLatest([
                this.tagProperties.rootAggregate.value$,
                this.tagProperties.rootDistinct.value$,
                this.tagProperties.rootPage.value$,
                this.tagProperties.rootPageSize.value$,
                this.tagProperties.rootTop.value$,
                this.tagProperties.rootTotalRecordsCount.value$,
        ]);

        return combined$.pipe(mergeMap(properties =>
            iif(() =>
                !properties[0] &&
                !properties[1] &&
                !properties[2] &&
                !properties[3] &&
                !properties[4] &&
                !properties[5],
                of(this.defaultDisplayValue), of(`
                ${properties[4] ? `Top: ${properties[4]}` : ''} 
                ${properties[3] ? `PgSz: ${properties[3]}` : ''} 
                ${properties[2] ? `Pg: ${properties[2]}` : ''} 
                ${properties[1] ? `Dst` : ''}
                ${properties[0] ? `Agg` : ''}
                ${properties[5] ? `TRC` : ''} `))
        ));
    }   
}
