import { Observable,  mergeMap, iif, of } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyFilter } from "../tag-properties/tag-property-filter";
import { FilterStaticData } from "../constants/ui/filter-static-data";

export class NodeFilter extends QueryNode {

    override tagProperties: TagPropertyFilter;

    constructor(tagProperties: TagPropertyFilter) {
        super(tagProperties);
        this.defaultDisplayValue = QueryNodeType.FILTER;
        this.order = QueryNodeOrder.FILTER;
        this.type = QueryNodeType.FILTER;
        this.actions = QueryNodeActions.FILTER;
    }

    override get displayValue$(): Observable<string> {
        return this.tagProperties.filterType.value$?.pipe(mergeMap(value => {
            value = value ? value.trim() : '';
            return iif(() => !value,
                of(this.defaultDisplayValue),
                of(`${this.defaultDisplayValue} (${FilterStaticData.FilterTypes.find(x => x.value === value)?.name})`))
        }));
    }
}
