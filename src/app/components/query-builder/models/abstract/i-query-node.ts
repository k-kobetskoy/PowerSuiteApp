import { BehaviorSubject, Observable } from "rxjs";
import { ITagProperties } from "./i-tag-properties";
import { IPropertyDisplay } from "./i-node-property-display";

export interface IQueryNode {
    defaultNodeDisplayValue: string;
    order: number;
    expandable: boolean;
    type: string;
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
    
    get displayValue$(): Observable<IPropertyDisplay>;
    getParentEntity(node: IQueryNode): IQueryNode;
    getParentEntityName(node: IQueryNode): BehaviorSubject<string>
}
