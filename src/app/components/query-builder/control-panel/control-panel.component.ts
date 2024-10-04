import { NodeTreeProcessorService } from './../services/node-tree-processor.service';
import { Component, OnInit } from '@angular/core';
import { IQueryNode } from '../models/abstract/i-query-node';
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

  constructor(private nodeTreeProcessorService: NodeTreeProcessorService) {
    this.selectedNode$ = this.nodeTreeProcessorService.selectedNode$
  }

  ngOnInit() { }
}