import { Injectable } from "@angular/core";
import { IQueryNode } from "../../../models/abstract/i-query-node";
import { NodeFactoryService } from "../../nodes-factory.service";
import { INodeAdder } from "./i-node-adder";

@Injectable({ providedIn: 'root' })
export abstract class BaseNodeAdder implements INodeAdder {

    constructor(protected nodeFactory: NodeFactoryService) {}

    protected add(newNodeType: string, parentNode: IQueryNode): IQueryNode {
        let newNode = this.nodeFactory.getNode(newNodeType)

        let nodeAbove = this.getNodeAbove(newNode.order, parentNode)

        let bottomNode = nodeAbove.next

        let nodeToSelect = newNode

        nodeAbove.next = newNode
        newNode.next = bottomNode

        newNode.level = parentNode.level + 1
        newNode.parent = parentNode

        return nodeToSelect
    }

    abstract addNode(newNodeType: string, parentNode?: IQueryNode): IQueryNode

    protected getNodeAbove(newNodeOrder: number, selectedNode: IQueryNode): IQueryNode {

        let current = selectedNode
        let newNodeLevel = selectedNode.level + 1

        while (current) {
            if (!current.next) { break }
            if (current.next.order > newNodeOrder && current.next.level === newNodeLevel) { break }
            if (current.next.level <= selectedNode.level) { break }
            current = current.next
        }
        return current
    }
}
