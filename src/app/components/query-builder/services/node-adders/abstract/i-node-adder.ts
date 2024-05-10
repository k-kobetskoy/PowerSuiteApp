import { IQueryNode } from "../../../models/abstract/i-query-node";

export interface INodeAdder {
    addNode(newNodeType: string, parentNode?: IQueryNode): IQueryNode;
}
