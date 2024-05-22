import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NodeCondition } from '../../../models/nodes/node-condition';
import { FormControl } from '@angular/forms';
import { Observable, Subject, distinctUntilChanged, map, of, startWith, switchMap, takeUntil } from 'rxjs';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeEntityService } from 'src/app/services/entity-service/attribute-entity.service';

@Component({
  selector: 'app-filter-condition-form',
  templateUrl: './filter-condition-form.component.html',
  styleUrls: ['./filter-condition-form.component.css']
})
export class FilterConditionFormComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  @Input() selectedNode: NodeCondition;
  @Output() onNodeCreate = new EventEmitter<string>();

  attributesFormControl = new FormControl<string>(null);

  attributes$: Observable<AttributeModel[]>;
  filteredAttributes$: Observable<AttributeModel[]> = null;

  entityName$: Observable<string>

  constructor(private _attributeEntityService: AttributeEntityService) { }

  ngOnInit() {
    this.getInitialData();

    this.addFilterToInput();

    this.bindDataToControls();

    this.setControlsInitialValues();
  }

  bindDataToControls() {
    this.attributesFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => {
        this.selectedNode.tagProperties.conditionAttribute.value$.next(value);
      });
  }

  setControlsInitialValues() {
    const attributeInitialValue = this.selectedNode.tagProperties.conditionAttribute.value$.getValue();
    
    this.attributesFormControl.setValue(attributeInitialValue);
  }

  getInitialData() {

    this.entityName$ = this.selectedNode.parent.parent.tagProperties.entityName.value$.asObservable();

    this.attributes$ = this.entityName$
      .pipe(
        distinctUntilChanged(),
        switchMap(entityName => {
          if (!entityName) {
            return of([]);
          }
          return this._attributeEntityService.getAttributes(entityName)
        }))
  }


  addFilterToInput() {
    this.filteredAttributes$ = this.attributesFormControl.valueChanges.pipe(
      startWith(this.selectedNode.tagProperties.conditionAttribute.value$.getValue() ?? ''),
      switchMap(value => value ? this._filter(value) : this.attributes$),
    );
  }

  private _filter(value: string): Observable<AttributeModel[]> {
    const filterValue = value.toLowerCase();

    this.selectedNode.tagProperties.conditionAttribute.value$.next(filterValue);

    return this.attributes$.pipe(map(
      attributes => attributes.filter(entity =>
        entity.logicalName.toLowerCase().includes(filterValue) ||
        entity.displayName.toLowerCase().includes(filterValue)
      )));
  }

  onKeyPressed($event: KeyboardEvent) {
    if ($event.key === 'Delete' || $event.key === 'Backspace') {
      if (this.attributesFormControl.value === '') {
        this.selectedNode.tagProperties.conditionAttribute.value$.next(null);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
