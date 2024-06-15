import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeFilter } from '../../../models/nodes/node-filter';
import { FilterStaticData } from '../../../models/constants/ui/filter-static-data';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  @Input() selectedNode: NodeFilter;

  filterTypeOptions = FilterStaticData.FilterTypes;

  constructor() { }

  ngOnInit() {
  }
}
