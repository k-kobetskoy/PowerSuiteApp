import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  @Input() selectedNode: FetchNode
  @Output() onNodeCreate = new EventEmitter<string>()

  createNode(nodeName: string) {
       this.onNodeCreate.emit(nodeName)
  }

  constructor() { }

  ngOnInit() {
  }
}
