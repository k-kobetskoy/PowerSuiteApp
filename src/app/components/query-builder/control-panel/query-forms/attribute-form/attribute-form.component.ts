import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeEntityAttribute } from '../../../models/nodes/node-entity-attribute';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, map, startWith } from 'rxjs';
import { RequestService } from 'src/app/services/request/request.service';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css']
})
export class AttributeFormComponent implements OnInit {

  @Input() selectedNode: NodeEntityAttribute;
  @Output() onNodeCreate = new EventEmitter<string>();

  subscriptions: Subscription[] = [];

  attributesFormControl = new FormControl<string>(null);
  aliasFormControl = new FormControl<string>(null);

  attributes: AttributeModel[] = [];
  filteredAttributes$: Observable<AttributeModel[]> = null;

  entityName$: BehaviorSubject<string>

  constructor(private requestService: RequestService) { }

  ngOnInit() {

    this.getEntityName();

    this.getAttributes();


    this.subscriptions.push(this.attributesFormControl.valueChanges.subscribe(value => {
      if (value !== this.selectedNode.tagProperties.attributeName.value$.getValue()) {
        this.selectedNode.tagProperties.attributeName.value$.next(value);
      }
    }));
    
    this.subscriptions.push(this.aliasFormControl.valueChanges.subscribe(value => {
      if (value !== this.selectedNode.tagProperties.attributeAlias.value$.getValue()) {
        this.selectedNode.tagProperties.attributeAlias.value$.next(value);
      }
    }));
    
    this.subscriptions.push(this.selectedNode.tagProperties.attributeName.value$.subscribe(value => {
      if (value !== this.attributesFormControl.value) {
        this.attributesFormControl.setValue(value);
      }
    }));
    
    this.subscriptions.push(this.selectedNode.tagProperties.attributeAlias.value$.subscribe(value => {
      if (value !== this.aliasFormControl.value) {
        this.aliasFormControl.setValue(value);
      }
    }));
  }


  getEntityName() {
    this.entityName$ = this.selectedNode.parent.tagProperties.entityName.value$
  }

  getAttributes() {
    this.subscriptions.push(this.requestService.getAttributes(this.entityName$.value).subscribe((data) => {
      this.attributes = data;
      this.addFilterToInput();
    }));
  }

  addFilterToInput() {
    this.filteredAttributes$ = this.attributesFormControl.valueChanges.pipe(
      startWith(this.selectedNode.tagProperties.attributeName.value$.getValue() ?? ''),
      map(value => value ? this._filter(value) : this.attributes),
    );
  }

  private _filter(value: string): AttributeModel[] {
    const filterValue = value.toLowerCase();

    this.selectedNode.tagProperties.attributeName.value$.next(filterValue)

    return this.attributes.filter(entity =>
      entity.logicalName.toLowerCase().includes(filterValue) ||
      entity.displayName.toLowerCase().includes(filterValue)
    );
  }

  onKeyPressed($event: KeyboardEvent) {
    if ($event.key === 'Delete' || $event.key === 'Backspace') {
      if (this.attributesFormControl.value === '') {
        this.selectedNode.tagProperties.attributeName.value$.next(null);
      }
    }
  }


}
