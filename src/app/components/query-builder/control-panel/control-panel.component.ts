import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueryNode } from '../models/abstract/i-query-node';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { AppEvents } from 'src/app/services/event-bus/app-events';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  @Input() selectedNode: IQueryNode
  @Output() onNodeCreate = new EventEmitter<string>()

  createNode(nodeName: string) {
    this.onNodeCreate.emit(nodeName)
  }

  constructor(private eventBus: EventBusService) { }

  ngOnInit() {
    this.eventBus.onLast(AppEvents.NODE_SELECTED, (node: IQueryNode) => {
      this.selectedNode = node
    })
  }
}
