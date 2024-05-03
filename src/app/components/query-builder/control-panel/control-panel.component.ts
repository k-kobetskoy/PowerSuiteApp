import { Component, OnInit } from '@angular/core';
import { IQueryNode } from '../models/abstract/i-query-node';
import { QueryNodeTree } from '../models/query-node-tree';
import { Observable } from 'rxjs';
import { QueryNodeType } from '../models/constants/query-node-type';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  selectedNode$: Observable<IQueryNode>
  nodeTypes = QueryNodeType

  createNode(nodeName: string) {
    this.nodeTree.addNode(nodeName)
  }

  constructor(private nodeTree: QueryNodeTree) { 
    this.selectedNode$ = this.nodeTree.selectedNode$
  }

  ngOnInit() {  }
}
