import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueryNode } from '../../../models/abstract/i-query-node';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.css']
})
export class QuickActionsComponent implements OnInit {

  @Input() selectedNode: IQueryNode
  @Output() onNodeCreate = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {  }

  createNode(nodeName: string) {
    this.onNodeCreate.emit(nodeName)
  }
}
