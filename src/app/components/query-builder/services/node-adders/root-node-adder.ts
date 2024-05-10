import { IQueryNode } from "../../models/abstract/i-query-node";
import { QueryNodeType } from "../../models/constants/query-node-type";
import { BaseNodeAdder } from "./abstract/base-node-adder";

export class RootNodeAdder extends BaseNodeAdder{
    
    
    override addNode(rootNodeType: string, selectedNode: IQueryNode): IQueryNode {
        let root = this.nodeFactory.getNode(rootNodeType);

        let entityNode = this.add(QueryNodeType.ENTITY, root);

        return entityNode;
    }

}
