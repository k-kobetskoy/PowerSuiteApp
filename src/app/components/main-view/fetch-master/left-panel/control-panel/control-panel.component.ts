import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueryNode } from 'src/app/models/query-builder/query-node';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  @Input() selectedNode: QueryNode
  @Output() onNodeCreate = new EventEmitter<string>()

  createNode(nodeName: string) {
       this.onNodeCreate.emit(nodeName)
  }

  constructor() { }

  ngOnInit() {
  }
}
