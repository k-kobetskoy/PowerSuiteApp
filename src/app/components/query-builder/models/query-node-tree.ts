import { QueryNodeType } from "src/app/components/query-builder/models/constants/query-node-type";
import { IQueryNode } from "./abstract/i-query-node";
import { inject } from "@angular/core";
import { EventBusService } from "src/app/services/event-bus/event-bus.service";
import { AppEvents } from "src/app/services/event-bus/app-events";
import { EventData } from "src/app/services/event-bus/event-data";
import { NodeAdderFactoryService } from "../services/query-adders/node-adder-factory.service";


export class QueryNodeTree implements Iterable<IQueryNode> {

    private _nodeAdderFactory = inject(NodeAdderFactoryService)
    private _eventBus = inject(EventBusService)


    private _id: string
    private _root: IQueryNode

    private _selectedNode: IQueryNode;

    public get selectedNode(): IQueryNode {
        if (!this._selectedNode || !this._selectedNode.visible) {
            this._selectedNode = null
            this._eventBus.emitAndSaveLast(new EventData(AppEvents.NODE_SELECTED, null))
        }
        return this._selectedNode;
    }

    public set selectedNode(value: IQueryNode) {
        if (value && value != this._selectedNode) {
            this._selectedNode = value;
            this._eventBus.emitAndSaveLast(new EventData(AppEvents.NODE_SELECTED, value))
        }
    }

    public get root(): IQueryNode {
        return this._root;
    }

    constructor() {
        this._root = this.addNode(QueryNodeType.ROOT)
    }

    addNode(newNodeType: string): IQueryNode {
        let nodeAdder = this._nodeAdderFactory.getAdder(newNodeType)
        this.selectedNode = nodeAdder.addNode(newNodeType, this._selectedNode)
        return this.selectedNode
    }

    removeNode(node: IQueryNode) {
        if (!node.parent) {
            throw new Error('Node has no parent.');
        }
        node.parent.next = node.next
        node.parent.expandable = node.parent.level === node.next.level ? false : true
    }

    [Symbol.iterator](): Iterator<IQueryNode, any, undefined> {

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





