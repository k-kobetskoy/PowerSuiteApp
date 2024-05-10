import { IQueryNode } from "../../models/abstract/i-query-node";
import { QueryNodeType } from "../../models/constants/query-node-type";
import { BaseNodeAdder } from "./abstract/base-node-adder";

export class FilterNodeAdder extends BaseNodeAdder {

    override addNode(newNodeType: string, parentNode: IQueryNode): IQueryNode {
        let newNode = this.nodeFactory.getNodeWithBaseFields(newNodeType)

        let nodeAbove = this.getNodeAbove(newNode.order, parentNode)

        let bottomNode = nodeAbove.next

        nodeAbove.next = newNode
        newNode.next = bottomNode

        newNode.level = parentNode.level + 1
        newNode.parent = parentNode

        let nodeToSelect = this.add(QueryNodeType.CONDITION, newNode)

        return nodeToSelect
    }
}
