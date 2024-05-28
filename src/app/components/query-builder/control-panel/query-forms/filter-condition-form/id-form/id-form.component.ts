import { Component, Input, OnInit } from '@angular/core';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';

@Component({
  selector: 'app-id-form',
  templateUrl: './id-form.component.html',
  styleUrls: ['./id-form.component.css']
})
export class IdFormComponent implements OnInit {

  @Input() selectedNode: NodeCondition;
  @Input() selectedAttribute: AttributeModel;
  
  constructor() { }

  ngOnInit() {
  }

}
