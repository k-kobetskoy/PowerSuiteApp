import { Observable, mergeMap, of, combineLatest, distinctUntilChanged } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyRoot } from "../tag-properties/tag-property-root";
import { IPropertyDisplay } from "../abstract/i-node-property-display";

export class NodeRoot extends QueryNode {

    override tagProperties: TagPropertyRoot;

    constructor(tagProperties: ITagProperties) {
        super(tagProperties);
        this.defaultNodeDisplayValue = QueryNodeType.ROOT;
        this.order = QueryNodeOrder.ROOT;
        this.type = QueryNodeType.ROOT;
        this.actions = QueryNodeActions.ROOT;
    }

    override get displayValue$(): Observable<IPropertyDisplay> {

        let combined$ = combineLatest([
            this.tagProperties.rootAggregate.value$,
            this.tagProperties.rootDistinct.value$,
            this.tagProperties.rootPage.value$,
            this.tagProperties.rootPageSize.value$,
            this.tagProperties.rootTop.value$,
            this.tagProperties.rootTotalRecordsCount.value$,
            this.tagProperties.rootPagingCookie.value$,
            this.tagProperties.rootLateMaterialize.value$,
            this.tagProperties.rootOptions.value$,
            this.tagProperties.rootDataSource.value$,
        ]);

        return combined$.pipe(
            mergeMap(([aggregate, distinct, page, pageSize, top, totalRecordsCount, pagingCookie, lateMaterialize, options, dataSource]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue,
                    tagPropertyDisplay: this.tagProperties.tagName
                };

                const nodeDisplay = aggregate || distinct || page || pageSize || totalRecordsCount || top;
                const tagDisplay = nodeDisplay || pagingCookie || lateMaterialize || options || dataSource;

                const pageString = page === null ? '' : page.toString();
                const pageSizeString = pageSize === null ? '' : pageSize.toString();
                const topString = top === null ? '' : top.toString();
                const distinctString = distinct === null || distinct===false? '' : distinct.toString();
                const aggregateString = aggregate === null || aggregate === false? '' : aggregate.toString();
                const totalRecordsCountString = totalRecordsCount === null || totalRecordsCount === false ? '' : totalRecordsCount.toString();
                const lateMaterializeString = lateMaterialize === null || lateMaterialize===false ? '' : lateMaterialize.toString();

                if(tagDisplay){
                    if(nodeDisplay){
                        propertyDisplay.nodePropertyDisplay = 
                        `${this.defaultNodeDisplayValue} ${topString ? `${this.tagProperties.rootTop.nodePropertyDisplay}: ${topString}` : ''} 
                        ${pageSizeString ? `${this.tagProperties.rootPageSize.nodePropertyDisplay}: ${pageSizeString}` : ''} 
                        ${pageString ? `${this.tagProperties.rootPage.nodePropertyDisplay}: ${pageString}` : ''} 
                        ${distinctString ? `${this.tagProperties.rootDistinct.nodePropertyDisplay}` : ''} 
                        ${aggregateString ? `${this.tagProperties.rootAggregate.nodePropertyDisplay}` : ''} 
                        ${totalRecordsCountString ? `${this.tagProperties.rootTotalRecordsCount.nodePropertyDisplay}` : ''}`.trim();
                    }
                    propertyDisplay.tagPropertyDisplay = 
                    `${this.tagProperties.tagName} 
                    ${topString ? `${this.tagProperties.rootTop.name}="${topString}"` : ''} 
                    ${distinctString ? `${this.tagProperties.rootDistinct.name}="${distinctString}"` : ''}
                    ${aggregateString ? `${this.tagProperties.rootAggregate.name}="${aggregateString}"` : ''}
                    ${totalRecordsCountString ? `${this.tagProperties.rootTotalRecordsCount.name}="${totalRecordsCountString}"` : ''}
                    ${pageSizeString ? `${this.tagProperties.rootPageSize.name}="${pageSizeString}"` : ''} 
                    ${pageString ? `${this.tagProperties.rootPage.name}="${pageString}"` : ''} 
                    ${pagingCookie ? `${this.tagProperties.rootPagingCookie.name}="${pagingCookie}"` : ''}
                    ${lateMaterialize ? `${this.tagProperties.rootLateMaterialize.name}="${lateMaterialize}"` : ''}
                    ${options ? `${this.tagProperties.rootOptions.name}="${options}"` : ''}
                    ${dataSource ? `${this.tagProperties.rootDataSource.name}="${dataSource}"` : ''}`.trim();
                }
                return of(propertyDisplay);
            }
            ), distinctUntilChanged());
    }
}
