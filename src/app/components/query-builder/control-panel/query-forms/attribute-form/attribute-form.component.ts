import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeEntityAttribute } from '../../../models/nodes/node-entity-attribute';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
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

  attributes$: Observable<AttributeModel[]>;
  filteredAttributes$: Observable<AttributeModel[]> = null;

  entityName$: Observable<string>

  constructor(private requestService: RequestService) { }

  ngOnInit() {    

    this.getInitialData();

    this.addFilterToInput();

    this.bindDataToControls();
   
  }
  
  
  bindDataToControls() {
    
    this.subscriptions.push(
      this.attributesFormControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(value => {
          this.selectedNode.tagProperties.attributeName.value$.next(value);
        })
    );

    this.subscriptions.push(
      this.aliasFormControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(value => {
          this.selectedNode.tagProperties.attributeAlias.value$.next(value);
        })
    );

    this.subscriptions.push(
      this.selectedNode.tagProperties.attributeName.value$
        .pipe(distinctUntilChanged())
        .subscribe(value => {
          this.attributesFormControl.setValue(value);
        })
    );

    this.subscriptions.push(
      this.selectedNode.tagProperties.attributeAlias.value$
        .pipe(distinctUntilChanged())
        .subscribe(value => {
          this.aliasFormControl.setValue(value);
        })
    );
  }

  getEntityName() {
    this.entityName$ = this.selectedNode.parent.tagProperties.entityName.value$.asObservable();
  }

  getInitialData() {
    
    this.entityName$ = this.selectedNode.parent.tagProperties.entityName.value$.asObservable();

    this.attributes$ = this.entityName$
      .pipe(
        distinctUntilChanged(),
        switchMap(entityName => { return this.requestService.getAttributes(entityName) }))
  }

  addFilterToInput() {
    this.filteredAttributes$ = this.attributesFormControl.valueChanges.pipe(
      startWith(this.selectedNode.tagProperties.attributeName.value$.getValue() ?? ''),
      switchMap(value => value ? this._filter(value) : this.attributes$),
    );
  }

  private _filter(value: string): Observable<AttributeModel[]> {
    const filterValue = value.toLowerCase();

    this.selectedNode.tagProperties.attributeName.value$.next(filterValue)

    return this.attributes$.pipe(map(
      attributes => attributes.filter(entity =>
      entity.logicalName.toLowerCase().includes(filterValue) ||
      entity.displayName.toLowerCase().includes(filterValue)
    )));
  }

  onKeyPressed($event: KeyboardEvent) {
    if ($event.key === 'Delete' || $event.key === 'Backspace') {
      if (this.attributesFormControl.value === '') {
        this.selectedNode.tagProperties.attributeName.value$.next(null);
      }
    }
  }
}
