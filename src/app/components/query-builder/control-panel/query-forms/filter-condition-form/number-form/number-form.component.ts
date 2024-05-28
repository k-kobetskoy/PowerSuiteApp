import { Component, Input, OnInit } from '@angular/core';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';

@Component({
  selector: 'app-number-form',
  templateUrl: './number-form.component.html',
  styleUrls: ['./number-form.component.css']
})
export class NumberFormComponent implements OnInit {
  
  @Input() selectedNode: NodeCondition;
  @Input() selectedAttribute: AttributeModel;
  
  constructor() { }

  ngOnInit() {
  }

}
