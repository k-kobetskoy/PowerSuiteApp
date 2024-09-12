import { ITagProperties } from "./abstract/i-tag-properties";
import { IQueryNode } from "./abstract/i-query-node";
import { BehaviorSubject, Observable } from "rxjs";
import { QueryNodeType } from "./constants/query-node-type";
import { IPropertyDisplay } from "./abstract/i-node-property-display";
import { EntityServiceFactoryService } from "../services/entity-service-factory.service";

export abstract class QueryNode implements IQueryNode {
    defaultNodeDisplayValue: string;
    order: number;
    expandable: boolean;
    type: string;
    id?: string;
    actions?: string[];
    level?: number;
    isExpanded?: boolean;
    next?: IQueryNode | null;
    parent?: IQueryNode | null;
    visible: boolean;
    tagProperties: ITagProperties;
    validationErrors$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    entitySetName$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    relationship$?: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    showOnlyLookups$?: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    validationPassed$: Observable<boolean>;
    entityServiceFactory: EntityServiceFactoryService;


    constructor(tagProperties: ITagProperties, entityServiceFactory: EntityServiceFactoryService) {
        this.expandable = false;
        this.level = 0;
        this.visible = true;
        this.isExpanded = true;
        this.next = null;
        this.tagProperties = tagProperties;
        this.entityServiceFactory = entityServiceFactory;
    }


// child node constructor:
// constructor(tagProperties: ITagProperties, entityServiceFactory: EntityServiceFactoryService) {
//     super(tagProperties, entityServiceFactory);
//     this.defaultNodeDisplayValue = QueryNodeType.ENTITY;
//     this.order = QueryNodeOrder.ENTITY;
//     this.type = QueryNodeType.ENTITY;
//     this.actions = QueryNodeActions.ENTITY;
//     this.validationPassed$ = this.validateNode();
// }

    get displayValue$(): Observable<IPropertyDisplay> {
        return new Observable<IPropertyDisplay>(observer => {
            observer.next({ nodePropertyDisplay: this.defaultNodeDisplayValue, tagPropertyDisplay: this.tagProperties.tagName });
        });
    }

    abstract validateNode(): Observable<boolean> 

    getParentEntity(node: IQueryNode = this): IQueryNode {

        if (node.type === QueryNodeType.ROOT) return null;

        const parent = node.parent;

        if (!parent) throw new Error('Parent not found');

        if (parent?.type === QueryNodeType.ENTITY || parent?.type === QueryNodeType.LINK) {
            return parent;
        } else {
            return this.getParentEntity(parent);
        }
    }

    getParentEntityName(node: IQueryNode = this): BehaviorSubject<string> {
        const parent = this.getParentEntity(node);

        if (!parent) return  new BehaviorSubject<string>('');
  
        return parent.tagProperties.entityName?.value$ ?? parent.tagProperties.linkEntity.value$;
    }
}
