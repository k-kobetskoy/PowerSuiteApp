import { IQueryNode } from "../../models/abstract/i-query-node";
import { QueryNodeType } from "../../models/constants/query-node-type";
import { BaseNodeAdder } from "./abstract/base-node-adder";

export class RootNodeAdder extends BaseNodeAdder{
    
    
    override addNode(newNodeType: string, selectedNode: IQueryNode): IQueryNode {
        let newNode = this.nodeFactory.getNodeWithBaseFields(newNodeType)

        let nodeToSelect = this.add(QueryNodeType.ENTITY, newNode)

        return nodeToSelect
    }

}
