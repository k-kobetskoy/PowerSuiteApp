import { BehaviorSubject, Observable } from "rxjs";
import { ITagProperties } from "./i-tag-properties";
import { IPropertyDisplay } from "./i-node-property-display";
import { EntityServiceFactoryService } from "../../services/entity-service-factory.service";

export interface IQueryNode {
    defaultNodeDisplayValue: string;
    order: number;
    expandable: boolean;
    name: string;
    id?: string;
    actions?: string[];
    inputs?: string[];
    level?: number;
    isExpanded?: boolean;
    next?: IQueryNode | null;
    parent?: IQueryNode | null;
    visible: boolean;
    tagProperties: ITagProperties;
    entitySetName$: BehaviorSubject<string>;
    validationErrors$: BehaviorSubject<string[]>;
    validationPassed$: Observable<boolean>;
    entityServiceFactory: EntityServiceFactoryService;
    
    get displayValue$(): Observable<IPropertyDisplay>;
    getParentEntity(node: IQueryNode): IQueryNode;
    getParentEntityName(node: IQueryNode): BehaviorSubject<string>
    validateNode(): Observable<boolean>;
}
