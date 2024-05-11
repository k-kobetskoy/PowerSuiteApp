import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueryNode } from '../../../models/abstract/i-query-node';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['./root-form.component.css']
})
export class RootFormComponent implements OnInit {

  @Input() selectedNode: IQueryNode
  @Output() onInputChange = new EventEmitter<IQueryNode>()
  @Output() onNodeCreate = new EventEmitter<string>()



  constructor() { }

  ngOnInit() {
  }


}
