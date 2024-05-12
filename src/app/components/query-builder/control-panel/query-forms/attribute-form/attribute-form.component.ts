import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeEntityAttribute } from '../../../models/nodes/node-entity-attribute';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css']
})
export class AttributeFormComponent implements OnInit {

  @Input() selectedNode: NodeEntityAttribute;
  @Output() onNodeCreate = new EventEmitter<string>()

  attributesFormControl = new FormControl<string>(null);
  aliasFormControl = new FormControl<string>(null);

  filteredAttributes$: Observable<string[]> = null;

  constructor() { }

  ngOnInit() {
  }

  onKeyPressed($event: KeyboardEvent) {
    if ($event.key === 'Delete' || $event.key === 'Backspace') {
      if (this.attributesFormControl.value === '') {    
        this.selectedNode.tagProperties.attributeName.value$.next(null);
      }
    }
  }


}
