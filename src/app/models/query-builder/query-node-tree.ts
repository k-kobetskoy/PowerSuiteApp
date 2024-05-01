import { QueryNode } from "./query-node";
import { NodeFactoryService } from "src/app/services/query-builder/nodes-factory.service";
import { FetchNodeType } from "src/app/config/fetch-node-type";

export class QueryNodeTree implements Iterable<QueryNode> {

    private _id: string
    private _root: QueryNode

    public get root() {
        return this._root;
    }

    constructor(private nodeFactory: NodeFactoryService) {

        this._root = this.nodeFactory.getNodeWithBaseFields(FetchNodeType.root)

        this.add(this._root, this.nodeFactory.getNodeWithBaseFields(FetchNodeType.entity))
    }

    addNode(parent: QueryNode, newNodeName: string): QueryNode {
        let newNode = this.nodeFactory.getNodeWithBaseFields(newNodeName)
        let result = this.add(parent, newNode)
        return result
    }

    removeNode(node: QueryNode) {
        if (!node.parent) {
            throw new Error('Node has no parent.');
        }
        node.parent.next = node.next
        node.parent.expandable = node.parent.level === node.next.level ? false : true
    }

    private add(parent: QueryNode, newNode: QueryNode): QueryNode {

        let nodeAbove = this.getNodeAbove(parent, newNode.order)

        let bottomNode = nodeAbove.next

        let nodeToSelect = newNode

        nodeAbove.next = newNode
        newNode.next = bottomNode

        newNode.level = parent.level + 1
        newNode.parent = parent

        if (nodeAbove.level < newNode.level) {
            nodeAbove.expandable = true
            nodeAbove.isExpanded = true
        }

        if (newNode.type == FetchNodeType.filter) {
            nodeToSelect = this.add(newNode, this.nodeFactory.getNodeWithBaseFields(FetchNodeType.condition))
        }

        return nodeToSelect
    }

    private getNodeAbove(parent: QueryNode, newNodeOrder: number): QueryNode {

        let current = parent
        let newNodeLevel = parent.level +1

        while (current) {
            if (!current.next) { break }
            if (current.next.order > newNodeOrder && current.next.level===newNodeLevel) { break }
            if (current.next.level <= parent.level) { break }
            current = current.next
        }

        return current
    }

    [Symbol.iterator](): Iterator<QueryNode, any, undefined> {

        let current = this._root

        return {
            next: () => {
                if (current) {
                    let val = current
                    current = current.next
                    return { done: false, value: val };
                } else {
                    return { done: true, value: null };
                }
            }
        }
    }
}





