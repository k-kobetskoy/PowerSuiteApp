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

  topFormControl = new FormControl<number>(null);
  pageSizeFormControl = new FormControl<number>(null);
  pageFormControl = new FormControl<number>(null);
  pagingCookieFormControl = new FormControl<string>(null);
  dataSourceFormControl = new FormControl<string>(null);

  distinctFormControl = new FormControl<boolean>(false);
  noLockFormControl = new FormControl<boolean>(false);
  aggregateFormControl = new FormControl<boolean>(false);
  totalRecordsCountFormControl = new FormControl<boolean>(false);
  lateMaterializeFormControl = new FormControl<boolean>(false);


  constructor() { }

  ngOnInit() { }

  createNode(nodeName: string) {
    this.onNodeCreate.emit(nodeName)
  }

  onKeyPressed($event: KeyboardEvent) {
    
    }
}
