import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { IQueryNode } from '../models/abstract/i-query-node';
import { QueryNodeTree } from 'src/app/components/query-builder/models/query-node-tree';
import { AppEvents } from 'src/app/services/event-bus/app-events';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { NodeTreeProcessorService } from '../services/node-tree-processor.service';

@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreePanelComponent implements OnInit {

  dataSource$: Observable<QueryNodeTree>
  selectedNode$: Observable<IQueryNode>

  constructor(
    private eventBus: EventBusService,
    private nodeTreeProcessor: NodeTreeProcessorService) { }

  ngOnInit() {
    this.dataSource$ = this.nodeTreeProcessor.getNodeTree()
    this.selectedNode$ = this.nodeTreeProcessor.selectedNode$    
  }

  selectNode(node: IQueryNode) {
    this.nodeTreeProcessor.selectedNode$ = node
  }

  toggleNode(node: IQueryNode) {
    this.nodeTreeProcessor.toggleNode(node)
  }
}
