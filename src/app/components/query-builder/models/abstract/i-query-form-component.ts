import { EventEmitter } from "@angular/core";
import { IQueryNode } from "./i-query-node";

export interface IQueryFormComponent {
    type: string;
    selectedNode: IQueryNode;
    onInputChange: EventEmitter<IQueryNode>;    
    onNodeCreate: EventEmitter<string>;
}
