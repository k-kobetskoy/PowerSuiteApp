import { Observable, mergeMap, iif, of, combineLatest, distinctUntilChanged, shareReplay } from "rxjs";
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

        return combined$.pipe(mergeMap(([aggregate, distinct, page, pageSize, top, totalRecordsCount]) => {
            const pageValue = page ===null ? '' : page.toString().trim();
            const pageSizeValue = pageSize  ===null? '' : pageSize.toString().trim();
            const topValue = top === null? '' : top.toString().trim();

            return iif(() =>
                !aggregate && !distinct && !pageValue && !pageSizeValue && !topValue && !totalRecordsCount,
                of(this.defaultDisplayValue),
                of(`
                ${topValue ? `Top: ${topValue}` : ''} 
                ${pageSizeValue ? `PgSz: ${pageSizeValue}` : ''} 
                ${pageValue ? `Pg: ${pageValue}` : ''} 
                ${distinct ? `Dst` : ''}
                ${aggregate ? `Agg` : ''}
                ${totalRecordsCount ? `TRC` : ''} `))
        }
        ), distinctUntilChanged());
    }
}
