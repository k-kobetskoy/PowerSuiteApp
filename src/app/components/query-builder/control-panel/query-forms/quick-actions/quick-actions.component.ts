import { Component, Input, OnInit } from '@angular/core';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { QueryNodeTree } from '../../../models/query-node-tree';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.css']
})
export class QuickActionsComponent implements OnInit {

  @Input() selectedNode: IQueryNode

  constructor(private nodeTree: QueryNodeTree) { }

  ngOnInit() { }

  addNode(nodeName: string) {
    this.nodeTree.addNode(nodeName);
  }
  
  resetTree() {
    throw new Error('Method not implemented.');
  }
  duplicateNode() {
    throw new Error('Method not implemented.');
  }
  deleteNode() {
    this.nodeTree.removeNode(this.selectedNode);
  }
}
