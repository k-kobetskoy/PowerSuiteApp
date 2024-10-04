import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { NodeEntity } from '../../../models/nodes/node-entity';
import { EntityEntityService } from 'src/app/components/query-builder/services/entity-services/entity-entity.service';
import { IFormPropertyModel } from '../../../models/abstract/i-form-property-model';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit, OnDestroy {

  @Input() selectedNode: NodeEntity;

  private _destroy$ = new Subject<void>();

  entityFormModel: IFormPropertyModel<EntityModel, string>;
  aliasFormModel: IFormPropertyModel<string, string>;

  constructor(private _entityEntityService: EntityEntityService) {   }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls() {
    this.entityFormModel = {
      formControl: new FormControl<string>(null),
      valuesObservable$: this._entityEntityService.getEntities(),
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.entityName.constructorValue$,
      filterFunc: (value: EntityModel, filterValue: string) => {
        return value.logicalName.toLowerCase().includes(filterValue.toLowerCase()) || value.displayName.toLowerCase().includes(filterValue.toLowerCase())
      }
    };
    this.setControlInitialValues(this.entityFormModel);
    this.addFilterToInput(this.entityFormModel);

    this.aliasFormModel = {
      formControl: new FormControl<string>(null),
      storedInputValue$: this.selectedNode.tagProperties.entityAlias.constructorValue$,
    };
    this.setControlInitialValues(this.aliasFormModel);
    this.subscribeOnInputChanges(this.aliasFormModel);
  }

  setControlInitialValues<TProperty, TForm>(propertyForm: IFormPropertyModel<TProperty, TForm>) {
    propertyForm.formControl.setValue(propertyForm.storedInputValue$.value);
  }

  subscribeOnInputChanges<TProperty, TForm>(propertyForm: IFormPropertyModel<TProperty, TForm>) {
    propertyForm.formControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => propertyForm.storedInputValue$.next(value));
  }

  addFilterToInput<TProperty extends EntityModel>(propertyForm: IFormPropertyModel<TProperty, string>) {
    propertyForm.filteredValues$ = propertyForm.formControl.valueChanges.pipe(
      startWith(propertyForm.storedInputValue$.value ?? ''),
      switchMap(value => value ? this._filter<TProperty>(value, propertyForm) : propertyForm.valuesObservable$)
    );
  }

  private _filter<TProperty extends EntityModel>(value: string, propertyForm: IFormPropertyModel<TProperty, string>): Observable<TProperty[]> {
    const filterValue = value.toLowerCase();

    return propertyForm.valuesObservable$.pipe(
      map(
        properties => {
          propertyForm.storedInputValue$.next(filterValue);
          return properties.filter((property) => propertyForm.filterFunc(property, filterValue))
        }),
        debounceTime(300),
        tap(properties=>{
          const property = properties.find(p => p.logicalName === value);
          if (property) {
            this.selectedNode.entitySetName$.next(property.entitySetName);
          }
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
