import { Component, Input, OnInit } from '@angular/core';
import { IQueryNode } from '../../models/abstract/i-query-node';

@Component({
  selector: 'app-query-node-tag',
  templateUrl: './query-node-tag.component.html',
  styleUrls: ['./query-node-tag.component.css']
})
export class QueryNodeTagComponent implements OnInit {

  // @Input() node: IQueryNode;
  // @Input() parerent?: IQueryNode;

  constructor() { }

  ngOnInit() { 
  }

}
