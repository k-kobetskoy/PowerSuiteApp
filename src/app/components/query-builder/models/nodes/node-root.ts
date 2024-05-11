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
            this.tagProperties.aggregate,
            this.tagProperties.dataSource,
            this.tagProperties.distinct,
            this.tagProperties.lateMaterialize,
            this.tagProperties.noLock,
            this.tagProperties.page,
            this.tagProperties.pageSize,
            this.tagProperties.pagingCookie,
            this.tagProperties.top,
            this.tagProperties.totalRecordsCount,
        ]);


        return combined$.pipe(mergeMap(properties =>
            iif(() =>
                !properties[0] &&
                !properties[1] &&
                !properties[2] &&
                !properties[3] &&
                !properties[4] &&
                !properties[5] &&
                !properties[6] &&
                !properties[7] &&
                !properties[8] &&
                !properties[9],
                of(this.defaultDisplayValue), of(`
                ${properties[8] ? `Top: ${properties[8]}` : ''} 
                ${properties[6] ? `PgSz: ${properties[6]}` : ''} 
                ${properties[5] ? `Pg: ${properties[5]}` : ''} 
                ${properties[7] ? `PgCk: ${properties[7]}` : ''} 
                ${properties[2] ? `Dst` : ''}
                ${properties[0] ? `Agg` : ''}
                ${properties[9] ? `TRC` : ''}   
                `))

        ));
    }   
}
