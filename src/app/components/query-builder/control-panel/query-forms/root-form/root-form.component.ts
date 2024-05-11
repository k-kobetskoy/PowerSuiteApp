import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { FormControl } from '@angular/forms';
import { NodeRoot } from '../../../models/nodes/node-root';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['./root-form.component.css']
})
export class RootFormComponent implements OnInit {

  @Input() selectedNode: NodeRoot
  @Output() onNodeCreate = new EventEmitter<string>()

  constructor() { }

  ngOnInit() { }

  createNode(nodeName: string) {
    this.onNodeCreate.emit(nodeName)
  }

  onKeyPressed($event: KeyboardEvent) {
    
    }
}
