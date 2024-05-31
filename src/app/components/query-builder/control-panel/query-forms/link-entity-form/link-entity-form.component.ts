import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable, distinctUntilChanged, takeUntil, startWith, switchMap, map, BehaviorSubject } from 'rxjs';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { EntityEntityService } from 'src/app/services/entity-service/entity-entity.service';
import { NodeLink } from '../../../models/nodes/node-link';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeEntityService } from 'src/app/services/entity-service/attribute-entity.service';
import { LinkTypeOptions } from '../../../models/constants/ui/link-type-options';

export interface LinkEntityProperty<TProperty, TForm> {
  storedInputValue$: BehaviorSubject<TForm>;
  formControl: FormControl<TForm>;
  valuesObservable$?: Observable<TProperty[]>;
  values?: TProperty[];
  filteredValues$?: Observable<TProperty[]>;
  filterFunc?: (value: TProperty, filterValue: string) => boolean;
}

@Component({
  selector: 'app-link-entity-form',
  templateUrl: './link-entity-form.component.html',
  styleUrls: ['./link-entity-form.component.css']
})
export class LinkEntityFormComponent implements OnChanges, OnDestroy {

  @Input() selectedNode: NodeLink;
  @Output() onNodeCreate = new EventEmitter<string>();

  private _destroy$ = new Subject<void>();

  relationShipForm: LinkEntityProperty<string, string>;
  linkEntityForm: LinkEntityProperty<EntityModel, string>;
  fromAttributeForm: LinkEntityProperty<AttributeModel, string>;
  toAttributeForm: LinkEntityProperty<AttributeModel, string>;
  linkTypeForm: LinkEntityProperty<string, string>;
  showOnlyLookupsForm: LinkEntityProperty<boolean, boolean>;
  aliasForm: LinkEntityProperty<string, string>;

  constructor(private _entityEntityService: EntityEntityService, private _attributeService: AttributeEntityService) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.selectedNode) {
      this._destroy$.next();
      this.initializeFormControls();
    }
  }

  initializeFormControls() {
    this.linkEntityForm = {
      formControl: new FormControl<string>(null),
      valuesObservable$: this._entityEntityService.getEntities(),
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.linkEntity.value$,
      filterFunc: (value: EntityModel, filterValue: string) => {
        return value.logicalName.toLowerCase().includes(filterValue.toLowerCase()) || value.displayName.toLowerCase().includes(filterValue.toLowerCase())
      }
    };
    this.setControlInitialValues(this.linkEntityForm);
    this.addFilterToInput(this.linkEntityForm)

    this.fromAttributeForm = {
      formControl: new FormControl<string>(null),
      valuesObservable$: this.selectedNode.tagProperties.linkEntity.value$.pipe(switchMap(entityName => this._attributeService.getAttributes(entityName))),
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.linkFromAttribute.value$,
      filterFunc: (value: AttributeModel, filterValue: string) => {
        return value.logicalName.toLowerCase().includes(filterValue.toLowerCase())
          || value.displayName.toLowerCase().includes(filterValue.toLowerCase())
      }
    };
    this.linkEntityForm.storedInputValue$.pipe(takeUntil(this._destroy$))
    .subscribe(value => {
      if (value) {
        this.fromAttributeForm.formControl.enable();
      } else {
        this.fromAttributeForm.formControl.disable();
      }
    });
    this.setControlInitialValues(this.fromAttributeForm);
    this.addFilterToInput(this.fromAttributeForm)

    this.toAttributeForm = {
      formControl: new FormControl<string>(null),
      valuesObservable$: this.selectedNode.getParentEntity()?.tagProperties.entityName.value$.pipe(switchMap(entityName => this._attributeService.getAttributes(entityName))),
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.linkToAttribute.value$,
      filterFunc: (value: AttributeModel, filterValue: string) => {
        return value.logicalName.toLowerCase().includes(filterValue.toLowerCase())
          || value.displayName.toLowerCase().includes(filterValue.toLowerCase())
      }
    };
    if (!this.selectedNode.getParentEntity()) {
      this.toAttributeForm.formControl.disable();
    }else{
      this.toAttributeForm.formControl.enable();
    }
    this.setControlInitialValues(this.toAttributeForm);
    this.addFilterToInput(this.toAttributeForm)    

    this.linkTypeForm = {
      formControl: new FormControl<string>(null),
      values: LinkTypeOptions,
      storedInputValue$: this.selectedNode.tagProperties.linkType.value$,
    };
    this.setControlInitialValues(this.linkTypeForm);
    this.subscribeOnInputChanges(this.linkTypeForm);

    this.showOnlyLookupsForm = {
      formControl: new FormControl<boolean>(null),
      storedInputValue$: this.selectedNode.showOnlyLookups$
    };
    this.setControlInitialValues(this.showOnlyLookupsForm);
    this.subscribeOnInputChanges(this.showOnlyLookupsForm);

    this.aliasForm = {
      formControl: new FormControl<string>(null),
      storedInputValue$: this.selectedNode.tagProperties.linkAlias.value$,
    };
    this.setControlInitialValues(this.aliasForm);
    this.subscribeOnInputChanges(this.aliasForm);
  }

  setControlInitialValues<TProperty, TForm>(linkEntityForm: LinkEntityProperty<TProperty, TForm>) {
    linkEntityForm.storedInputValue$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => linkEntityForm.formControl.setValue(value));
  }

  subscribeOnInputChanges<TProperty, TForm>(linkEntityForm: LinkEntityProperty<TProperty, TForm>) {
    linkEntityForm.formControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => linkEntityForm.storedInputValue$.next(value));
  }

  addFilterToInput<TProperty>(propertyForm: LinkEntityProperty<TProperty, string>) {
    propertyForm.filteredValues$ = propertyForm.formControl.valueChanges.pipe(
      startWith(propertyForm.storedInputValue$.value ?? ''),
      switchMap(value => value ? this._filter<TProperty>(value, propertyForm) : propertyForm.valuesObservable$)
    );
  }

  onKeyPressed($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }

  private _filter<TProperty>(value: string, propertyForm: LinkEntityProperty<TProperty, string>): Observable<TProperty[]> {
    const filterValue = value.toLowerCase();

    propertyForm.storedInputValue$.next(filterValue)

    return propertyForm.valuesObservable$.pipe(
      map(entities => {
        if (!entities) return [];
        return entities.filter((entity) => propertyForm.filterFunc(entity, filterValue))
      })
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
