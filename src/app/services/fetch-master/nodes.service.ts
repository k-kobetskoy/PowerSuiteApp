import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { FetchNodeTree } from 'src/app/models/fetch-master/fetch-node-tree';

@Injectable({ providedIn: 'root' })
export class NodesService {


  constructor() { }

  generateUniqueTreeId(): string {
    return new Date().getTime().toString()
  }

  generateNodeId(nodeTree: FetchNodeTree): number {
    let maxNodeId = +sessionStorage.getItem(Constants.maxNodeId + nodeTree.id)
        
    if (maxNodeId===0) { maxNodeId = 2}

    ++maxNodeId

    sessionStorage.setItem(Constants.maxNodeId + nodeTree.id, maxNodeId.toString())

    return maxNodeId
  }


  addNodeToTree(parent: FetchNode, node: FetchNode, nodeTree: FetchNodeTree) {
    node.id = this.generateNodeId(nodeTree)
    parent.children.push(node)       
  }
}
