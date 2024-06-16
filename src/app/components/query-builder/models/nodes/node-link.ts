import { Observable, combineLatest, mergeMap, of, distinctUntilChanged } from "rxjs";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyLink } from "../tag-properties/tag-property-link";
import { IPropertyDisplay } from "../abstract/i-node-property-display";

export class NodeLink extends QueryNode {

    override tagProperties: TagPropertyLink;

    constructor(tagProperties: TagPropertyLink) {
        super(tagProperties);
        this.defaultNodeDisplayValue = QueryNodeType.LINK;
        this.order = QueryNodeOrder.LINK;
        this.type = QueryNodeType.LINK;
        this.actions = QueryNodeActions.LINK;
    }

    override get displayValue$(): Observable<IPropertyDisplay> {

        let combined$ = combineLatest([
            this.tagProperties.linkEntity.value$,
            this.tagProperties.linkType.value$,
            this.tagProperties.linkAlias.value$,
            this.tagProperties.linkIntersect.value$,
            this.tagProperties.linkFromAttribute.value$,
            this.tagProperties.linkToAttribute.value$,
            this.tagProperties.linkVisible.value$,
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
                        propertyDisplay.nodePropertyDisplay = `${entityName ? `${entityName}` : ''}${linkType ? ` ${linkType}` : ''}${intersect ? ` ${this.tagProperties.linkIntersect.nodePropertyDisplay}` : ''}${linkAlias ? ` (${linkAlias})` : ''}`;
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
