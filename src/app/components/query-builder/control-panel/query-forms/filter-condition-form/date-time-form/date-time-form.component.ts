import { Component, Input, OnInit } from '@angular/core';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';

@Component({
  selector: 'app-date-time-form',
  templateUrl: './date-time-form.component.html',
  styleUrls: ['./date-time-form.component.css']
})
export class DateTimeFormComponent implements OnInit {

  @Input() selectedNode: NodeCondition;
  @Input() selectedAttribute: AttributeModel;
  
  constructor() { }

  ngOnInit() {
  }

}
