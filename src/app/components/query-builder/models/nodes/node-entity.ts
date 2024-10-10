import { Observable, combineLatest, debounceTime, distinctUntilChanged, map, mergeMap, of, switchMap } from "rxjs";
import { ITagProperties } from "../abstract/i-tag-properties";
import { QueryNodeActions } from "../constants/query-node-actions";
import { QueryNodeOrder } from "../constants/query-node-order.enum";
import { QueryNodeType } from "../constants/query-node-type";
import { QueryNode } from "../query-node";
import { TagPropertyEntity } from "../tag-properties/tag-property-entity";
import { IPropertyDisplay } from "../abstract/i-node-property-display";
import { EntityEntityService } from "../../services/entity-services/entity-entity.service";
import { EntityServiceFactoryService } from "../../services/entity-service-factory.service";
import { TAG_PROPERTY_VALIDATION_FUNCIONS } from "../tag-properties/tag-properties-validation-functions";
import { name } from "@azure/msal-angular/packageMetadata";

export class NodeEntity extends QueryNode {

    override tagProperties: TagPropertyEntity;

    constructor(tagProperties: ITagProperties, entityServiceFactory: EntityServiceFactoryService) {
        super(tagProperties, entityServiceFactory);
        this.defaultNodeDisplayValue = QueryNodeType.ENTITY;
        this.order = QueryNodeOrder.ENTITY;
        this.name = QueryNodeType.ENTITY;
        this.actions = QueryNodeActions.ENTITY;
        this.validationPassed$ = this.validateNode();
    }

    override validateNode(): Observable<boolean> {
        const entityService = this.entityServiceFactory.getEntityService("Entity") as EntityEntityService;
        return entityService.getEntities().pipe(
            distinctUntilChanged(),            
            switchMap(entities => {
                return this.tagProperties.entityName.constructorValue$.pipe(
                    distinctUntilChanged(),
                    debounceTime(500),
                    map(entityName => {
                        if (!entityName) {
                            return true;
                        } else {
                            const entity = entities.find(e => e.logicalName === entityName);
                            return !!entity;
                        }
                    })
                );
            })
        )
    }

    override get displayValue$(): Observable<IPropertyDisplay> {
        const combined$ = combineLatest([
            this.tagProperties.entityName.constructorValue$,
            this.tagProperties.entityAlias.constructorValue$,     
        ]);

        return combined$.pipe(
            mergeMap(([entityName, entityAlias]) => {
                const propertyDisplay: IPropertyDisplay = {
                    nodePropertyDisplay: this.defaultNodeDisplayValue,
                    tagPropertyDisplay: this.tagProperties.tagName
                };
             
                const display = entityName || entityAlias;
                
                if (display) {
                    propertyDisplay.nodePropertyDisplay = `${entityName ? entityName : ''}${entityAlias ? ` (${entityAlias})` : ''}`.trim();
                    propertyDisplay.tagPropertyDisplay = `${this.tagProperties.tagName}${entityName ? ` ${this.tagProperties.entityName.name}="${entityName}"` : ''}${entityAlias ? ` ${this.tagProperties.entityAlias.name}="${entityAlias}"` : ''}`.trim();
                }

                return of(propertyDisplay);
            }),
            distinctUntilChanged());
    }
}
