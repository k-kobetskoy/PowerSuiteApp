import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { FetchNodeType } from 'src/app/config/fetch-node-type';
import { FetchNodeChildRule } from 'src/app/config/fetch-node-child-rule';

@Component({
  selector: 'app-base-node-editor',
  templateUrl: './base-node-editor.component.html',
  styleUrls: ['./base-node-editor.component.css']
})
export class BaseNodeEditorComponent implements OnInit {

  @Input() selectedNode: FetchNode
  @Output() onNodeCreate = new EventEmitter<string>()

  nodeType = FetchNodeType
  childNodeRules = FetchNodeChildRule

  constructor() { }

  ngOnInit() {    

  }

  createNewNode(nodeName: string) {
    this.onNodeCreate.emit(nodeName)
  }

}
