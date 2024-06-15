import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { IFormPropertyModel } from '../../../models/abstract/i-form-property-model';
import { BehaviorSubject, Observable, Subject, combineLatest, distinctUntilChanged, map, of, startWith, switchMap, takeUntil } from 'rxjs';
import { AttributeTypes } from '../../../models/constants/dataverse/attribute-types';
import { AttributeEntityService } from 'src/app/components/query-builder/services/entity-services/attribute-entity.service';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { NodeOrder } from '../../../models/nodes/node-order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnChanges {

  private _destroy$ = new Subject<void>();

  @Input() selectedNode: NodeOrder;

  attributeForm: IFormPropertyModel<AttributeModel, string>;

  attributePreviousValue$?: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private _attributeService: AttributeEntityService) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.selectedNode) {
      this._destroy$.next();
      this.initializeFormControls();
    }
  }

  initializeFormControls() {   
    this.attributeForm = {
      formControl: new FormControl<string>(null),
      valuesObservable$: combineLatest([
        this.selectedNode.getParentEntityName().pipe(
          switchMap(entityName => entityName === null ? of([]) : this._attributeService.getAttributes(entityName))
        ),
        this.selectedNode.showOnlyLookups$
      ]).pipe(
        map(([attributes, showOnlyLookups]) => {
          return attributes.filter(attribute => !(showOnlyLookups && attribute.attributeType !== AttributeTypes.LOOKUP));
        })
      ),
      previousValue$: this.attributePreviousValue$,
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.orderAttribute.value$,
      filterFunc: (value: AttributeModel, filterValue: string) => {
        return value.logicalName.toLowerCase().includes(filterValue.toLowerCase())
          || value.displayName.toLowerCase().includes(filterValue.toLowerCase())
      }
    };

    this.selectedNode.getParentEntityName().pipe(
      distinctUntilChanged(),
      takeUntil(this._destroy$))
      .subscribe(entityName => {
        if (!entityName) {
          this.attributeForm.formControl.disable();
        } else {
          this.attributeForm.formControl.enable();
        }
      });
      this.setControlInitialValues(this.attributeForm);
      this.addFilterToInput(this.attributeForm);
  }

  setControlInitialValues<TProperty, TForm>(formPropertyModel: IFormPropertyModel<TProperty, TForm>) {
    formPropertyModel.storedInputValue$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => formPropertyModel.formControl.setValue(value));
  }
  
  addFilterToInput<TProperty extends EntityModel | AttributeModel>(formPropertyModel: IFormPropertyModel<TProperty, string>) {
    formPropertyModel.filteredValues$ = formPropertyModel.formControl.valueChanges.pipe(
      startWith(formPropertyModel.storedInputValue$.value ?? ''),
      switchMap(value => value ? this._filter<TProperty>(value, formPropertyModel) : formPropertyModel.valuesObservable$)
    );
  }

  private _filter<TProperty extends EntityModel | AttributeModel>(value: string, formPropertyModel: IFormPropertyModel<TProperty, string>): Observable<TProperty[]> {
    const filterValue = value.toLowerCase();

    return formPropertyModel.valuesObservable$.pipe(
      map(
        properties => {
          const property = properties.find(prop => prop.logicalName.toLowerCase() === filterValue);
          if (property) {
            formPropertyModel.handlePropertyChangeFunc?.(property);
            formPropertyModel.storedInputValue$.next(filterValue);
            formPropertyModel.previousValue$?.next(filterValue);

          };
          return properties.filter((property) => formPropertyModel.filterFunc(property, filterValue))
        }));
  }

  onInputChanged<TProperty, TForm>(event: Event, formPropertyModel: IFormPropertyModel<TProperty, TForm>) {
    if (event.target['value'].trim() === '') {
      formPropertyModel.storedInputValue$.next(null);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
