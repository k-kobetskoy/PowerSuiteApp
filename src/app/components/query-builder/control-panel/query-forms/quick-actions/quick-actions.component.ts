import { Component, Input, OnInit } from '@angular/core';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { NodeTreeProcessorService } from '../../../services/node-tree-processor.service';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.css']
})
export class QuickActionsComponent implements OnInit {

  @Input() selectedNode: IQueryNode

  constructor(private nodeTreeProcessor: NodeTreeProcessorService) { }

  ngOnInit() { }

  addNode(nodeName: string) {
    this.nodeTreeProcessor.addNode(nodeName);
  }
  
  resetTree() {
    throw new Error('Method not implemented.');
  }
  duplicateNode() {
    throw new Error('Method not implemented.');
  }
  deleteNode() {
    this.nodeTreeProcessor.removeNode(this.selectedNode);
  }
}
