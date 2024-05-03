import { QueryNodeType } from "src/app/components/query-builder/models/constants/query-node-type";
import { IQueryNode } from "./abstract/i-query-node";
import { Inject, inject } from "@angular/core";
import { NodeAdderFactoryService } from "../services/node-adders/node-adder-factory.service";
import { BehaviorSubject, Observable } from "rxjs";

Inject({ providedIn: 'root' })
export class QueryNodeTree implements Iterable<IQueryNode> {

    private _nodeAdderFactory = inject(NodeAdderFactoryService)

    private _id: string
    private _root: IQueryNode

    private _selectedNode$: BehaviorSubject<IQueryNode> = new BehaviorSubject<IQueryNode>(null);

    public get selectedNode$(): Observable<IQueryNode> {
        return this._selectedNode$.asObservable();
    }

    public set selectedNode$(value: IQueryNode) {
        if (value != this._selectedNode$.value) {
            this._selectedNode$.next(value);
        }
    }

    public get root(): IQueryNode {
        return this._root;
    }

    constructor() {
        this.init()
    }

    private init() {
        this._root = this.addNode(QueryNodeType.ROOT)
    }

    addNode(newNodeType: string): IQueryNode {
        let nodeAdder = this._nodeAdderFactory.getAdder(newNodeType)
        let newNodeToSelect = nodeAdder.addNode(newNodeType, this._selectedNode$.value)
        if (this._selectedNode$.value) {
            this.expandNode(this._selectedNode$.value)
        }
        this.selectedNode$ = newNodeToSelect
        return newNodeToSelect
    }

    removeNode(node: IQueryNode) {
        if (!node.parent) {
            throw new Error('Node has no parent.');
        }
        node.parent.next = node.next
        node.parent.expandable = node.parent.level !== node.next.level
    }

    expandNode(node: IQueryNode) {
        node.expandable = true
        if (!node.isExpanded) {
            this.toggleNode(node)
        }
    }

    toggleNode(node: IQueryNode) {
        if (!node.expandable) { return; }

        node.isExpanded = !node.isExpanded;

        let parent = node;
        let nextNestedChild = node.next;

        while (nextNestedChild && nextNestedChild.level > parent.level) {
            if (!parent.isExpanded) {
                nextNestedChild.visible = false;
            } else {
                nextNestedChild.visible = nextNestedChild.parent.isExpanded && nextNestedChild.parent.visible;
            }
            nextNestedChild = nextNestedChild.next;
        }

        if (this._selectedNode$ && !this._selectedNode$.value.visible) {
            this.selectedNode$ = null
        }
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





