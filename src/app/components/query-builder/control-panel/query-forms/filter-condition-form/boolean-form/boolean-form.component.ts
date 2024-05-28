import { Component, Input, OnInit } from '@angular/core';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';

@Component({
  selector: 'app-boolean-form',
  templateUrl: './boolean-form.component.html',
  styleUrls: ['./boolean-form.component.css']
})
export class BooleanFormComponent implements OnInit {

  @Input() selectedNode: NodeCondition;
  @Input() selectedAttribute: AttributeModel;
  
  constructor() { }

  ngOnInit() {
  }

}
