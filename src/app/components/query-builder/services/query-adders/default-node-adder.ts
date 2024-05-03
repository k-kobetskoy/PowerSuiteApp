import { IQueryNode } from "../../models/abstract/i-query-node";
import { BaseNodeAdder } from "./abstract/base-node-adder";

export class DefaultNodeAdder extends BaseNodeAdder {
    
    override addNode(newNodeType: string, parentNode?: IQueryNode): IQueryNode {
        return this.add(newNodeType, parentNode);
    }
}
