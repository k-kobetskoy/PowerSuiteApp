import { Constants } from "src/app/config/constants";
import { FetchNode } from "./fetch-node";

export class FetchNodeTree implements Iterable<FetchNode> {
    private _id: string
    private _root: FetchNode

    public get root() {
        return this._root;
    }


    constructor() {
        this._root = { ...Constants.initialRootNode }
        this.addNode(this._root, { ...Constants.initialEnitityNode })
    }



    addNode(parent: FetchNode, newNode: FetchNode) {

        let connectionNode = this.getNodeToConnect(parent)


        let newNextNode = connectionNode.next

        connectionNode.next = newNode
        newNode.next = newNextNode
        newNode.level = parent.level +1
        newNode.parent = connectionNode
        // newNode.nextExists = !!newNode.next

        if (connectionNode.level < newNode.level) {
            connectionNode.expandable = true
            connectionNode.isExpanded = true
        }
    }

    removeNode(node: FetchNode) {
        node.parent.next = node.next
        node.parent.expandable = node.parent.level === node.next.level ? false : true
    }

    private getNodeToConnect(parent: FetchNode): FetchNode {

        if (!parent.next) {
            return parent
        }
        if (parent.next.level === parent.level) {
            return parent
        }

        let current = parent

        while (current.next) {
            
            if (current.next.level < current.level) {
                return current
            }
            if (current.next.type.order > current.type.order) {
                return current
            }
            current = current.next
        }
        return current
    }


    [Symbol.iterator](): Iterator<FetchNode, any, undefined> {


        let curr = this._root

        return {
            next: () => {
                if (curr) {
                    let val = curr
                    curr = curr.next
                    return { done: false, value: val };
                } else {
                    return { done: true, value: null };
                }
            }
        }
    }
}





