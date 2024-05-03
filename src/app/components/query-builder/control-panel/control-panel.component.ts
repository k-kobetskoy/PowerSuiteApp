import { Component, OnInit } from '@angular/core';
import { IQueryNode } from '../models/abstract/i-query-node';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { QueryNodeTree } from '../models/query-node-tree';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  selectedNode$: Observable<IQueryNode>

  createNode(nodeName: string) {
    this.nodeTree.addNode(nodeName)
  }

  constructor(private eventBus: EventBusService, private nodeTree: QueryNodeTree) { 
    this.selectedNode$ = this.nodeTree.selectedNode$
  }

  ngOnInit() {  }
}
