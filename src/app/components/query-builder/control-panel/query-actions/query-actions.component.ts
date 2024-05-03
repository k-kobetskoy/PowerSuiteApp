import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueryNode } from '../../models/abstract/i-query-node';

@Component({
  selector: 'app-query-actions',
  templateUrl: './query-actions.component.html',
  styleUrls: ['./query-actions.component.css']
})
export class QueryActionsComponent implements OnInit {

  @Input() selectedNode: IQueryNode
  @Output() onNodeCreate = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {  }

  createNewNode(nodeName: string) {
    this.onNodeCreate.emit(nodeName)
  }
}