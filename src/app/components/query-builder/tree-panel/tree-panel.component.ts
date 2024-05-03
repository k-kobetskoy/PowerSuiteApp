import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IQueryNode } from '../models/abstract/i-query-node';
import { QueryNodeTree } from 'src/app/components/query-builder/models/query-node-tree';
import { AppEvents } from 'src/app/services/event-bus/app-events';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';

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
    private tree: QueryNodeTree) { }

  ngOnInit() {
    this.dataSource$ = of(this.tree)
    this.selectedNode$ = this.tree.selectedNode$
    this.eventBus.on(AppEvents.ENVIRONMENT_CHANGED, () => this.ngOnInit())
  }

  selectNode(node: IQueryNode) {
    this.tree.selectedNode$ = node
  }

  toggleNode(node: IQueryNode) {
    this.tree.toggleNode(node)
  }

}
