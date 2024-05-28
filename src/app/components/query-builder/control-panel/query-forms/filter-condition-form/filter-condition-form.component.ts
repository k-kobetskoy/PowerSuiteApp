import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NodeCondition } from '../../../models/nodes/node-condition';
import { FormControl } from '@angular/forms';
import { Observable, Subject, distinctUntilChanged, find, map, of, share, single, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeEntityService } from 'src/app/services/entity-service/attribute-entity.service';
import { AttributeTypes } from '../../../models/constants/dataverse/attribute-types';
import { FilterOperatorTypes } from '../../../models/constants/ui/option-set-types';

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

  selectedAttribute$: Observable<AttributeModel>;

  FilterOperatorTypes = FilterOperatorTypes;

  previousAttribute: AttributeModel;

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
        }));
  }


  addFilterToInput() {
    this.filteredAttributes$ = this.attributesFormControl.valueChanges.pipe(
      startWith(this.selectedNode.tagProperties.conditionAttribute.value$.getValue() ?? ''),
      switchMap(value => value ? this._filter(value) : this.attributes$),
    );
  }

  private _filter(value: string): Observable<AttributeModel[]> {
    const filterValue = value.toLowerCase();

    return this.attributes$.pipe(
      map(
        attributes => {
          const attribute = attributes.find(attr => attr.logicalName.toLowerCase() === filterValue);
          if (attribute) {            
            this.handleAttributeChange(attribute);
            this.selectedAttribute$ = of(attribute);            
            this.previousAttribute = attribute;
          };
          return attributes.filter(entity =>
            entity.logicalName.toLowerCase().includes(filterValue) ||
            entity.displayName.toLowerCase().includes(filterValue)
          )
        }),
      tap(_ => this.selectedNode.tagProperties.conditionAttribute.value$.next(filterValue)));
  }

  onKeyPressed($event: KeyboardEvent) {
    if ($event.key === 'Delete' || $event.key === 'Backspace') {
      if (this.attributesFormControl.value === '') {
        this.selectedNode.tagProperties.conditionAttribute.value$.next(null);
      }
    }
  }

  handleAttributeChange(attribute: AttributeModel): void {
    if(!this.previousAttribute || attribute.logicalName === this.previousAttribute?.logicalName) return;
    console.warn('Attribute changed');
    this.selectedNode.tagProperties.conditionOperator.value$.next(null);
    this.selectedNode.tagProperties.conditionValue.value$.next(null);
  }

  getFilterOperatorType(attribute: AttributeModel) {
    switch (attribute.attributeType) {
      case AttributeTypes.INTEGER:
      case AttributeTypes.DECIMAL:
      case AttributeTypes.BIG_INT:
      case AttributeTypes.MONEY:
      case AttributeTypes.DOUBLE:
        return FilterOperatorTypes.NUMBER;
      case AttributeTypes.DATE_TIME:
        return FilterOperatorTypes.DATE_TIME;
      case AttributeTypes.BOOLEAN:
        return FilterOperatorTypes.BOOLEAN;
      case AttributeTypes.UNIQUE_IDENTIFIER:
      case AttributeTypes.LOOKUP:
      case AttributeTypes.OWNER:
      case AttributeTypes.CUSTOMER:
        return FilterOperatorTypes.ID;
      case AttributeTypes.PICKLIST:
      case AttributeTypes.STATE:
      case AttributeTypes.STATUS:
        return FilterOperatorTypes.PICKLIST;
      default:
        return FilterOperatorTypes.STRING;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
