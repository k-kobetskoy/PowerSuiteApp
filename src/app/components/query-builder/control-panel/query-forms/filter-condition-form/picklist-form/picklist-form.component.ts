import { Component, Input, OnInit } from '@angular/core';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';

@Component({
  selector: 'app-picklist-form',
  templateUrl: './picklist-form.component.html',
  styleUrls: ['./picklist-form.component.css']
})
export class PicklistFormComponent implements OnInit {

  @Input() selectedNode: NodeCondition;
  @Input() selectedAttribute: AttributeModel;
  
  constructor() { }

  ngOnInit() {
  }

}
