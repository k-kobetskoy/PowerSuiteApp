import { ITagProperties } from "./abstract/i-tag-properties";
import { IQueryNode } from "./abstract/i-query-node";
import { BehaviorSubject, Observable } from "rxjs";
import { QueryNodeType } from "./constants/query-node-type";
import { IPropertyDisplay } from "./abstract/i-node-property-display";

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
    validationPassed: boolean;
    tagProperties: ITagProperties;
    entitySetName$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    relationship$?: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    showOnlyLookups$?: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(tagProperties: ITagProperties) {
        this.expandable = false;
        this.level = 0;
        this.visible = true;
        this.isExpanded = true;
        this.next = null;
        this.validationPassed = true;
        this.tagProperties = tagProperties;
    }

    get displayValue$(): Observable<IPropertyDisplay> {
        return new Observable<IPropertyDisplay>(observer => {
            observer.next({ nodePropertyDisplay: this.defaultNodeDisplayValue, tagPropertyDisplay: this.tagProperties.tagName });
        });
    }

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
