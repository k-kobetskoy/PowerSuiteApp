import { NodeAdderFactoryService } from './node-adders/node-adder-factory.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QueryNodeTree } from '../models/query-node-tree';
import { IQueryNode } from '../models/abstract/i-query-node';
import { AppEvents } from 'src/app/services/event-bus/app-events';
import { QueryNodeType } from '../models/constants/query-node-type';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';

@Injectable({ providedIn: 'root' })

export class NodeTreeProcessorService {

  private _nodeTree$: BehaviorSubject<QueryNodeTree> = new BehaviorSubject<QueryNodeTree>(null);

  xmlRequest$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _selectedNode$: BehaviorSubject<IQueryNode> = new BehaviorSubject<IQueryNode>(null);

  public get selectedNode$(): Observable<IQueryNode> {
    return this._selectedNode$.asObservable();
  }

  public set selectedNode$(value: IQueryNode) {
    if (value != this._selectedNode$.value) {
      this._selectedNode$.next(value);
    }
  }

  constructor(private _nodeAdderFactory: NodeAdderFactoryService, private _eventBus: EventBusService) { 
    this._eventBus.on(AppEvents.ENVIRONMENT_CHANGED, () => this.initializeNodeTree())
  }

  getNodeTree(): BehaviorSubject<QueryNodeTree> {
    if (this._nodeTree$.value) {
      return this._nodeTree$;
    }

    this.initializeNodeTree();

    return this._nodeTree$;
  }

  initializeNodeTree() {
    const nodeTree = new QueryNodeTree();

    const rootNodeAdder = this._nodeAdderFactory.getAdder(QueryNodeType.ROOT);
    const rootNode = rootNodeAdder.addNode(QueryNodeType.ROOT, null);

    nodeTree.root = rootNode;

    const entityNodeAdder = this._nodeAdderFactory.getAdder(QueryNodeType.ENTITY);
    const entityNode = entityNodeAdder.addNode(QueryNodeType.ENTITY, rootNode);

    this.expandNode(rootNode);
    this.selectedNode$ = entityNode;
        
    this._nodeTree$.next(nodeTree);
  }

  addNode(newNodeType: string): IQueryNode {
    let nodeAdder = this._nodeAdderFactory.getAdder(newNodeType)
    let newNodeToSelect = nodeAdder.addNode(newNodeType, this._selectedNode$.value)
    if (this._selectedNode$.value) {
      this.expandNode(this._selectedNode$.value)
    }
    this.selectedNode$ = newNodeToSelect
    this._eventBus.emit({ name: AppEvents.NODE_ADDED })
    return newNodeToSelect
  }

  removeNode(node: IQueryNode) {
    if (!node.parent) {
      throw new Error('Node has no parent.');
    }

    const previousNode = this.getPreviousNode(node);
    const nextNode = this.getNextNodeWithTheSameLevel(node);

    if (!previousNode) {
      throw new Error('Previous node not found.');
    }

    previousNode.next = nextNode;

    if (nextNode) {
      previousNode.expandable = previousNode.level < previousNode.next.level;
    } else {
      previousNode.expandable = false;
    }

    this._selectedNode$.next(previousNode);
    this._eventBus.emit({ name: AppEvents.NODE_REMOVED })
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

    if (this._selectedNode$ && !this._selectedNode$.value?.visible) {
      this.selectedNode$ = null
    }
  }

  private getNextNodeWithTheSameLevel(node: IQueryNode): IQueryNode {
    let nextNode = node.next;

    while (nextNode && nextNode.level > node.level) {
      nextNode = nextNode.next;
    }

    return nextNode;
  }

  private getPreviousNode(node: IQueryNode): IQueryNode {
    const parent = node.parent;

    let previousNode = parent;

    while (previousNode.next !== node) {
      previousNode = previousNode.next;
    }

    return previousNode;
  }
}
