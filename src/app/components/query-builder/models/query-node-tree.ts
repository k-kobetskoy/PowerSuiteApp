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
        return this._selectedNode;
    }

    public set selectedNode(value: IQueryNode) {
        if (value && value != this._selectedNode) {
            this._selectedNode = value;
            this._eventBus.emitAndSaveLast(new EventData(AppEvents.NODE_SELECTED, value))
        }
    }

    public get root() {
        return this._root;
    }

    constructor() {
        this.addNode(QueryNodeType.ROOT)
        this._root = this._selectedNode.parent
    }

    addNode(newNodeType: string) {       
        let nodeAdder = this._nodeAdderFactory.getAdder(newNodeType)
        this.selectedNode = nodeAdder.addNode(newNodeType, this._selectedNode)
        return 
    }

    removeNode(node: IQueryNode) {
        if (!node.parent) {
            throw new Error('Node has no parent.');
        }
        node.parent.next = node.next
        node.parent.expandable = node.parent.level === node.next.level ? false : true
    }

    private add(newNode: IQueryNode){

        let nodeAbove = this.getNodeAbove(newNode.order)

        let bottomNode = nodeAbove.next

        let nodeToSelect = newNode

        nodeAbove.next = newNode
        newNode.next = bottomNode

        newNode.level = this._selectedNode.level + 1
        newNode.parent = this._selectedNode


        //should be tested. nodeAbove was replaced with this._selectedNode
        if (this._selectedNode.level < newNode.level) {
            this._selectedNode.expandNode(this._selectedNode)
            
            // this._selectedNode.expandable = true
            // this._selectedNode.isExpanded = true
        }

        // if (newNode.type == QueryNodeType.FILTER) {
        //     nodeToSelect = this.add(newNode, this.nodeFactory.getNodeWithBaseFields(QueryNodeType.CONDITION))
        // }

        // this.selectedNode = newNode
        // if (newNode.type == QueryNodeType.FILTER) {
        //     this.add(this.nodeFactory.getNodeWithBaseFields(QueryNodeType.CONDITION))
        // }

        return nodeToSelect
    }

    private getNodeAbove(newNodeOrder: number): IQueryNode {

        let current = this._selectedNode
        let newNodeLevel = this._selectedNode.level + 1

        while (current) {
            if (!current.next) { break }
            if (current.next.order > newNodeOrder && current.next.level === newNodeLevel) { break }
            if (current.next.level <= this._selectedNode.level) { break }
            current = current.next
        }

        return current
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





