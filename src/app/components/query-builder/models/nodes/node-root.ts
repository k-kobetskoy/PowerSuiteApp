import { Observable, mergeMap, of, combineLatest, distinctUntilChanged } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyRoot } from "../tag-properties/tag-property-root";
import { IPropertyDisplay } from "../abstract/i-node-property-display";
import { EntityServiceFactoryService } from "../../services/entity-service-factory.service";

export class NodeRoot extends QueryNode {

    override tagProperties: TagPropertyRoot;

    constructor(tagProperties: ITagProperties, entityServiceFactory: EntityServiceFactoryService) {
        super(tagProperties, entityServiceFactory);
        this.defaultNodeDisplayValue = QueryNodeType.ROOT;
        this.order = QueryNodeOrder.ROOT;
        this.type = QueryNodeType.ROOT;
        this.actions = QueryNodeActions.ROOT;
    }

    override get displayValue$(): Observable<IPropertyDisplay> {

        let combined$ = combineLatest([
            this.tagProperties.rootAggregate.constructorValue$,
            this.tagProperties.rootDistinct.constructorValue$,
            this.tagProperties.rootPage.constructorValue$,
            this.tagProperties.rootPageSize.constructorValue$,
            this.tagProperties.rootTop.constructorValue$,
            this.tagProperties.rootTotalRecordsCount.constructorValue$,
            this.tagProperties.rootPagingCookie.constructorValue$,
            this.tagProperties.rootLateMaterialize.constructorValue$,
            this.tagProperties.rootOptions.constructorValue$,
            this.tagProperties.rootDataSource.constructorValue$,

            this.tagProperties.rootAggregate.typeValidationPassed$,
            this.tagProperties.rootDistinct.typeValidationPassed$,
            this.tagProperties.rootPage.typeValidationPassed$,
            this.tagProperties.rootPageSize.typeValidationPassed$,
            this.tagProperties.rootTop.typeValidationPassed$,
            this.tagProperties.rootTotalRecordsCount.typeValidationPassed$,
            this.tagProperties.rootLateMaterialize.typeValidationPassed$,
        ]);

        return combined$.pipe(
            mergeMap(([aggregate, distinct, page, pageSize, top, totalRecordsCount, pagingCookie, lateMaterialize, options, dataSource,
                aggregateTypeValidation, distinctTypeValidation, pageTypeValidation, pageSizeTypeValidation,
                topTypeValidation, totalRecordsCountTypeValidation, lateMaterializeTypeValidation
            ]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue,
                    tagPropertyDisplay: this.tagProperties.tagName
                };

                const nodeDisplay = aggregate || distinct || page || pageSize || totalRecordsCount || top
                    || !aggregateTypeValidation || !distinctTypeValidation || !pageTypeValidation || !pageSizeTypeValidation || !topTypeValidation || !totalRecordsCountTypeValidation;

                const tagDisplay = nodeDisplay || pagingCookie || lateMaterialize || options || dataSource || !lateMaterializeTypeValidation;

                let pageString = ''; 
                if(!pageTypeValidation) {
                    const parsedValue = this.tagProperties.rootPage.parsedValue$.value;
                    pageString = parsedValue ? '' : parsedValue.toString()
                } 
                else{pageString = page === null ? '' : page.toString()};
                
                let pageSizeString = ''; 
                if(!pageSizeTypeValidation) {
                    const parsedValue = this.tagProperties.rootPageSize.parsedValue$.value;
                    pageSizeString = parsedValue ? '' : parsedValue.toString()
                }
                else{pageSizeString = pageSize === null ? '' : pageSize.toString()};
                


                let topString = '';
                if(!topTypeValidation) {
                    const parsedValue = this.tagProperties.rootTop.parsedValue$.value;
                    topString = parsedValue ? '' : parsedValue.toString()
                }
                else{topString = top === null ? '' : top.toString()};

                let distinctString ='';
                if(!distinctTypeValidation) {
                    const parsedValue = this.tagProperties.rootDistinct.parsedValue$.value;
                    distinctString = parsedValue ? '' : parsedValue.toString()
                }
                else{distinctString = distinct === null || distinct === false ? '' : distinct.toString()};
                


                let aggregateString = '';
                if(!aggregateTypeValidation) {
                    const parsedValue = this.tagProperties.rootAggregate.parsedValue$.value;
                    aggregateString = parsedValue ? '' : parsedValue.toString()
                }
                else{aggregateString = aggregate === null || aggregate === false ? '' : aggregate.toString()};
                
                let totalRecordsCountString = '';
                if(!totalRecordsCountTypeValidation) {
                    const parsedValue = this.tagProperties.rootTotalRecordsCount.parsedValue$.value;
                    totalRecordsCountString = parsedValue ? '' : parsedValue.toString();
                }
                else{totalRecordsCountString = totalRecordsCount === null || totalRecordsCount === false ? '' : totalRecordsCount.toString()};
                
                let lateMaterializeString = '';
                if(!lateMaterializeTypeValidation) {
                    const parsedValue = this.tagProperties.rootLateMaterialize.parsedValue$.value;
                    lateMaterializeString = parsedValue ? '' : parsedValue.toString();
                }
                else{lateMaterializeString = lateMaterialize === null || lateMaterialize === false ? '' : lateMaterialize.toString()};

                if (tagDisplay) {
                    if (nodeDisplay) {
                        propertyDisplay.nodePropertyDisplay =
                            [
                                this.defaultNodeDisplayValue,
                                topString ? ` ${this.tagProperties.rootTop.nodePropertyDisplay}: ${topString}` : '',
                                pageSizeString ? ` ${this.tagProperties.rootPageSize.nodePropertyDisplay}: ${pageSizeString}` : '',
                                pageString ? ` ${this.tagProperties.rootPage.nodePropertyDisplay}: ${pageString}` : '',
                                distinctString ? ` ${this.tagProperties.rootDistinct.nodePropertyDisplay}` : '',
                                aggregateString ? ` ${this.tagProperties.rootAggregate.nodePropertyDisplay}` : '',
                                totalRecordsCountString ? ` ${this.tagProperties.rootTotalRecordsCount.nodePropertyDisplay}` : ''
                            ].filter(part => part).join('');
                    }
                    propertyDisplay.tagPropertyDisplay =
                        [
                            this.tagProperties.tagName,
                            topString ? ` ${this.tagProperties.rootTop.name}="${topString}"` : '',
                            distinctString ? ` ${this.tagProperties.rootDistinct.name}="${distinctString}"` : '',
                            aggregateString ? ` ${this.tagProperties.rootAggregate.name}="${aggregateString}"` : '',
                            totalRecordsCountString ? ` ${this.tagProperties.rootTotalRecordsCount.name}="${totalRecordsCountString}"` : '',
                            pageSizeString ? ` ${this.tagProperties.rootPageSize.name}="${pageSizeString}"` : '',
                            pageString ? ` ${this.tagProperties.rootPage.name}="${pageString}"` : '',
                            pagingCookie ? ` ${this.tagProperties.rootPagingCookie.name}="${pagingCookie}"` : '',
                            lateMaterialize ? ` ${this.tagProperties.rootLateMaterialize.name}="${lateMaterialize}"` : '',
                            options ? ` ${this.tagProperties.rootOptions.name}="${options}"` : '',
                            dataSource ? ` ${this.tagProperties.rootDataSource.name}="${dataSource}"` : ''
                        ].filter(part => part).join('');
                }
                return of(propertyDisplay);
            }
            ), distinctUntilChanged());
    }
}
