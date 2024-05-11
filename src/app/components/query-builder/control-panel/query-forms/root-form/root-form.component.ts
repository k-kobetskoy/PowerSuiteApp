import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['./root-form.component.css']
})
export class RootFormComponent implements OnInit {


  @Input() selectedNode: IQueryNode
  @Output() onInputChange = new EventEmitter<IQueryNode>()
  @Output() onNodeCreate = new EventEmitter<string>()

  topFormControl = new FormControl<string>(null);
  pageSizeFormControl = new FormControl<string>(null);
  pageFormControl = new FormControl<string>(null);
  pageingCookieFormControl = new FormControl<string>(null);


  constructor() { }

  ngOnInit() {  }

  createNode(nodeName: string) {
    this.onNodeCreate.emit(nodeName)
  }
}
