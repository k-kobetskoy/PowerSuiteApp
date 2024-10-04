import { Observable, mergeMap, of, distinctUntilChanged, combineLatest } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyFilter } from "../tag-properties/tag-property-filter";
import { FilterStaticData } from "../constants/ui/filter-static-data";
import { IPropertyDisplay } from "../abstract/i-node-property-display";
import { EntityServiceFactoryService } from "../../services/entity-service-factory.service";

export class NodeFilter extends QueryNode {

    override tagProperties: TagPropertyFilter;

    constructor(tagProperties: TagPropertyFilter, entityServiceFactory: EntityServiceFactoryService) {
        super(tagProperties, entityServiceFactory);
        this.defaultNodeDisplayValue = QueryNodeType.FILTER;
        this.order = QueryNodeOrder.FILTER;
        this.type = QueryNodeType.FILTER;
        this.actions = QueryNodeActions.FILTER;
    }


    override get displayValue$(): Observable<IPropertyDisplay> {

        const combined$ = combineLatest([
            this.tagProperties.filterType.constructorValue$,
            this.tagProperties.filterBypassQuickFind.constructorValue$,
            this.tagProperties.filterIsQuickFind.constructorValue$,
            this.tagProperties.filterOverrideRecordLimit.constructorValue$,
        ]);

        return combined$.pipe(
            mergeMap(([filterType, filterBypassQuickFind, filterIsQuickFind, filterOverrideRecordLimit]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue,
                    tagPropertyDisplay: this.tagProperties.tagName
                };

                const tagDisplay = filterType || filterBypassQuickFind || filterIsQuickFind || filterOverrideRecordLimit;
                const nodeDisplay = filterType;

                const bypassString = filterBypassQuickFind ? filterBypassQuickFind.toString() : '';
                const quickFindString = filterIsQuickFind ? filterIsQuickFind.toString() : '';
                const overrideRecordLimitString = filterOverrideRecordLimit ? filterOverrideRecordLimit.toString() : '';

                if (tagDisplay) {
                    if (nodeDisplay) {
                        propertyDisplay.nodePropertyDisplay = `${this.defaultNodeDisplayValue} (${FilterStaticData.FilterTypes.find(x => x.value === filterType)?.name})`.trim();
                    }
                    propertyDisplay.tagPropertyDisplay = [
                        this.tagProperties.tagName,
                        filterType ? ` ${this.tagProperties.filterType.name}="${filterType}"` : '',
                        bypassString ? ` ${this.tagProperties.filterBypassQuickFind.name}="${bypassString}"` : '',
                        quickFindString ? ` ${this.tagProperties.filterIsQuickFind.name}="${quickFindString}"` : '',
                        overrideRecordLimitString ? ` ${this.tagProperties.filterOverrideRecordLimit.name}="${overrideRecordLimitString}"` : ''
                    ].filter(part => part).join('')
                }

                return of(propertyDisplay);
            }),
            distinctUntilChanged());
    }
}
