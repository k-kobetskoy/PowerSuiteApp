import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NodeEntityAttribute } from '../../../models/nodes/node-entity-attribute';
import { FormControl } from '@angular/forms';
import { Observable, Subject, distinctUntilChanged, map, of, startWith, switchMap, takeUntil } from 'rxjs';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeEntityService } from 'src/app/components/query-builder/services/entity-services/attribute-entity.service';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css']
})
export class AttributeFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedNode: NodeEntityAttribute;

  private destroy$ = new Subject<void>();

  attributesFormControl = new FormControl<string>(null);
  aliasFormControl = new FormControl<string>(null);

  selectedAttribute$: Observable<AttributeModel>;
  attributes$: Observable<AttributeModel[]>;
  filteredAttributes$: Observable<AttributeModel[]> = null;

  entityName$: Observable<string>

  constructor(private _attributeEntityService: AttributeEntityService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNode) {      
      this.addFilterToInput();
      this.setInputsInitialValues();
    }
  }

  ngOnInit() {
    this.getInitialData();

    this.addFilterToInput();

    this.bindDataToControls();

    this.setInputsInitialValues();
  }
  
  bindDataToControls() {
    this.attributesFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => {
        this.selectedNode.tagProperties.attributeName.value$.next(value);
      });

    this.aliasFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => {
        this.selectedNode.tagProperties.attributeAlias.value$.next(value);
      });
  }

  setInputsInitialValues() {
    const aliasInitialValue = this.selectedNode.tagProperties.attributeAlias.value$.getValue();
    const attributeInitialValue = this.selectedNode.tagProperties.attributeName.value$.getValue();

    this.aliasFormControl.setValue(aliasInitialValue);
    this.attributesFormControl.setValue(attributeInitialValue);
  }

  getInitialData() {
    this.entityName$ = this.selectedNode.getParentEntityName();

    this.attributes$ = this.entityName$
      .pipe(
        distinctUntilChanged(),
        switchMap(entityName => {
          if (!entityName) {
            return of([]);
          }
          return this._attributeEntityService.getAttributes(entityName);
        }))
  }

  addFilterToInput() {
    this.filteredAttributes$ = this.attributesFormControl.valueChanges.pipe(
      startWith(this.selectedNode.tagProperties.attributeName.value$.getValue() ?? ''),
      switchMap(value => value ? this._filter(value) : this.attributes$),
    );
  }

  private _filter(value: string): Observable<AttributeModel[]> {
    const filterValue = value.toLowerCase();

    this.selectedNode.tagProperties.attributeName.value$.next(filterValue);

    return this.attributes$.pipe(
      map(attributes =>
        attributes.filter(
          entity =>
            entity.logicalName.toLowerCase().includes(filterValue) ||
            entity.displayName.toLowerCase().includes(filterValue)
        )
      )
    );
  }

  onKeyPressed($event: KeyboardEvent) {
    if ($event.key === 'Delete' || $event.key === 'Backspace') {
      if (this.attributesFormControl.value === '') {
        this.selectedNode.tagProperties.attributeName.value$.next(null);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}