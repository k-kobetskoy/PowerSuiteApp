import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constants } from 'src/app/config/constants';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';

@Injectable({ providedIn: 'root' })
export class NodesService {
  dataChange = new BehaviorSubject<FetchNode[]>([]);
  
  get data(): FetchNode[] { return this.dataChange.value }




  getInitialNodes() {
    var nodes: FetchNode[] = []

    let root = { ...Constants.initialRootNode }

    root.children.push({...Constants.initialEnitityNode})

    nodes.push(root)

    return nodes
  }

  addChild(parent: FetchNode, node: FetchNode){
    node.id = this.generateUniqueNodeId()
    parent.children.push(node)
  }

  generateUniqueTreeId(): string {
    return `tree-${new Date().getTime().toString()}`
  }

  generateUniqueNodeId(): string {
    return `node-${new Date().getTime().toString()}`
  }
}
