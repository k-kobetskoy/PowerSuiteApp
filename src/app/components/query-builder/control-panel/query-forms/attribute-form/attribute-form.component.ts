import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NodeEntityAttribute } from '../../../models/nodes/node-entity-attribute';
import { FormControl } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil } from 'rxjs';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeEntityService } from 'src/app/components/query-builder/services/entity-services/attribute-entity.service';
import { IFormPropertyModel } from '../../../models/abstract/i-form-property-model';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css']
})
export class AttributeFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedNode: NodeEntityAttribute;

  private _destroy$ = new Subject<void>();

  attributeFormModel: IFormPropertyModel<AttributeModel, string>;
  aliasFormModel: IFormPropertyModel<string, string>;

  constructor(private _attributeEntityService: AttributeEntityService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNode) {
      this.initializeFormControls();      
    }
  }

  ngOnInit() {
    this.initializeFormControls();
    this.setParentEntity();
  }

  initializeFormControls() {
    this.attributeFormModel = {
      formControl: new FormControl<string>(null),
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.attributeName.value$,
      filterFunc: (value: AttributeModel, filterValue: string) => {
        return value.logicalName.toLowerCase().includes(filterValue.toLowerCase()) || value.displayName.toLowerCase().includes(filterValue.toLowerCase())
      }
    };
    
    this.setControlInitialValues(this.attributeFormModel);
    this.addFilterToInput(this.attributeFormModel);

    this.aliasFormModel = {
      formControl: new FormControl<string>(null),
      storedInputValue$: this.selectedNode.tagProperties.attributeAlias.value$,
    };
    this.setControlInitialValues(this.aliasFormModel);
    this.subscribeOnInputChanges(this.aliasFormModel);
  }

  setParentEntity() {
    console.warn('setParentEntity');
    this.selectedNode.getParentEntityName()
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(entityName => {
        this.attributeFormModel.valuesObservable$ = this._attributeEntityService.getAttributes(entityName);
      });
  }

  setControlInitialValues<TProperty, TForm>(propertyForm: IFormPropertyModel<TProperty, TForm>) {
    propertyForm.formControl.setValue(propertyForm.storedInputValue$.value);
  }

  subscribeOnInputChanges<TProperty, TForm>(propertyForm: IFormPropertyModel<TProperty, TForm>) {
    propertyForm.formControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => propertyForm.storedInputValue$.next(value));
  }

  addFilterToInput<TProperty extends AttributeModel>(propertyForm: IFormPropertyModel<TProperty, string>) {
    propertyForm.filteredValues$ = propertyForm.formControl.valueChanges.pipe(
      startWith(propertyForm.storedInputValue$.value ?? ''),
      switchMap(value => value ? this._filter<TProperty>(value, propertyForm) : propertyForm.valuesObservable$)
    );
  }

  private _filter<TProperty extends AttributeModel>(value: string, propertyForm: IFormPropertyModel<TProperty, string>): Observable<TProperty[]> {
    const filterValue = value.toLowerCase();

    return propertyForm.valuesObservable$.pipe(
      map(
        properties => {
          propertyForm.storedInputValue$.next(filterValue);
          return properties.filter((property) => propertyForm.filterFunc(property, filterValue))
        })
    );
  }

  onInputChanged<TProperty, TForm>(event: Event, propertyForm: IFormPropertyModel<TProperty, TForm>) {
    if (event.target['value'].trim() === '') {
      propertyForm.storedInputValue$.next(null);
      this.selectedNode.entitySetName$.next(null);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}