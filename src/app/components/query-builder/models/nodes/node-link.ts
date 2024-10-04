import { Observable, combineLatest, mergeMap, of, distinctUntilChanged } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyLink } from "../tag-properties/tag-property-link";
import { IPropertyDisplay } from "../abstract/i-node-property-display";
import { EntityServiceFactoryService } from "../../services/entity-service-factory.service";

export class NodeLink extends QueryNode {

    override tagProperties: TagPropertyLink;

    constructor(tagProperties: TagPropertyLink, entityServiceFactory: EntityServiceFactoryService) {
        super(tagProperties, entityServiceFactory);
        this.defaultNodeDisplayValue = QueryNodeType.LINK;
        this.order = QueryNodeOrder.LINK;
        this.type = QueryNodeType.LINK;
        this.actions = QueryNodeActions.LINK;
    }


    override get displayValue$(): Observable<IPropertyDisplay> {

        let combined$ = combineLatest([
            this.tagProperties.linkEntity.constructorValue$,
            this.tagProperties.linkType.constructorValue$,
            this.tagProperties.linkAlias.constructorValue$,
            this.tagProperties.linkIntersect.constructorValue$,
            this.tagProperties.linkFromAttribute.constructorValue$,
            this.tagProperties.linkToAttribute.constructorValue$,
            this.tagProperties.linkVisible.constructorValue$,
        ]);

        return combined$?.pipe(
            mergeMap(([entityName, linkType, linkAlias, intersect, fromAttribute, toAttribute, visible]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue,
                    tagPropertyDisplay: this.tagProperties.tagName
                };

                const tagDisplay = entityName || linkType || linkAlias || intersect || fromAttribute || toAttribute || visible;
                const nodeDisplay = entityName || linkAlias || linkType || intersect;

                const intersectString = intersect ? intersect.toString() : '';
                const visibleString = visible ? visible.toString() : '';

                if (tagDisplay) {
                    if (nodeDisplay) {
                        propertyDisplay.nodePropertyDisplay = `${entityName ? `${entityName}` : ''}${linkType ? ` ${linkType}` : ''}${intersect ? ` ${this.tagProperties.linkIntersect.treeViewDisplayValue}` : ''}${linkAlias ? ` (${linkAlias})` : ''}`;
                    }
                    propertyDisplay.tagPropertyDisplay = [
                        this.tagProperties.tagName,
                        entityName ? ` ${this.tagProperties.linkEntity.name}="${entityName}"` : '',
                        linkType ? ` ${this.tagProperties.linkType.name}="${linkType}"` : '',
                        linkAlias ? ` ${this.tagProperties.linkAlias.name}="${linkAlias}"` : '',
                        intersectString ? ` ${this.tagProperties.linkIntersect.name}="${intersectString}"` : '',
                        fromAttribute ? ` ${this.tagProperties.linkFromAttribute.name}="${fromAttribute}"` : '',
                        toAttribute ? ` ${this.tagProperties.linkToAttribute.name}="${toAttribute}"` : '',
                        visibleString ? ` ${this.tagProperties.linkVisible.name}="${visibleString}"` : ''
                    ].filter(part => part).join('');
                }

                return of(propertyDisplay);
            }),
            distinctUntilChanged());
    }
}
