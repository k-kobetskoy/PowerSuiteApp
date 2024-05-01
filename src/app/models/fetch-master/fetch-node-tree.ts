import { FetchNode } from "./fetch-node";
import { NodeFactoryService } from "src/app/services/fetch-master/nodes-factory.service";
import { FetchNodeType } from "src/app/config/fetch-node-type";

export class FetchNodeTree implements Iterable<FetchNode> {

    private _id: string
    private _root: FetchNode

    public get root() {
        return this._root;
    }

    constructor(private nodeFactory: NodeFactoryService) {

        this._root = this.nodeFactory.getNodeWithBaseFields(FetchNodeType.root)

        this.add(this._root, this.nodeFactory.getNodeWithBaseFields(FetchNodeType.entity))
    }

    addNode(parent: FetchNode, newNodeName: string): FetchNode {
        let newNode = this.nodeFactory.getNodeWithBaseFields(newNodeName)
        let result = this.add(parent, newNode)
        return result
    }

    removeNode(node: FetchNode) {
        node.parent.next = node.next
        node.parent.expandable = node.parent.level === node.next.level ? false : true
    }

    private add(parent: FetchNode, newNode: FetchNode): FetchNode {

        let upperNode = this.getUpperNode(parent, newNode.order)

        let bottomNode = upperNode.next

        let nodeToSelect = newNode

        upperNode.next = newNode
        newNode.next = bottomNode

        newNode.level = parent.level + 1
        newNode.parent = parent

        if (upperNode.level < newNode.level) {
            upperNode.expandable = true
            upperNode.isExpanded = true
        }

        if (newNode.type == FetchNodeType.filter) {
            nodeToSelect = this.add(newNode, this.nodeFactory.getNodeWithBaseFields(FetchNodeType.condition))
        }

        return nodeToSelect
    }

    private getUpperNode(parent: FetchNode, newNodeOrder: number): FetchNode {

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

    [Symbol.iterator](): Iterator<FetchNode, any, undefined> {

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





