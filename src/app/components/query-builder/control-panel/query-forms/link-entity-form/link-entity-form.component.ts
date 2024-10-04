import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable, distinctUntilChanged, takeUntil, startWith, switchMap, map, BehaviorSubject, of, combineLatest } from 'rxjs';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { EntityEntityService } from 'src/app/components/query-builder/services/entity-services/entity-entity.service';
import { NodeLink } from '../../../models/nodes/node-link';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { AttributeEntityService } from 'src/app/components/query-builder/services/entity-services/attribute-entity.service';
import { LinkTypeOptions } from '../../../models/constants/ui/link-type-options';
import { AttributeTypes } from '../../../models/constants/dataverse/attribute-types';
import { IFormPropertyModel } from '../../../models/abstract/i-form-property-model';

@Component({
  selector: 'app-link-entity-form',
  templateUrl: './link-entity-form.component.html',
  styleUrls: ['./link-entity-form.component.css']
})
export class LinkEntityFormComponent implements OnChanges, OnDestroy {

  @Input() selectedNode: NodeLink;

  private _destroy$ = new Subject<void>();

  relationShipForm: IFormPropertyModel<string, string>;
  linkEntityForm: IFormPropertyModel<EntityModel, string>;
  fromAttributeForm: IFormPropertyModel<AttributeModel, string>;
  toAttributeForm: IFormPropertyModel<AttributeModel, string>;
  linkTypeForm: IFormPropertyModel<string, string>;
  showOnlyLookupsForm: IFormPropertyModel<boolean, boolean>;
  aliasForm: IFormPropertyModel<string, string>;

  linkTypes: string[] = LinkTypeOptions;

  //TODO: replace BehaviorSubject with simple Objects
  linkEntityPreviousValue$?: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  fromAttributePreviousValue$?: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  toAttributePreviousValue$?: BehaviorSubject<string> = new BehaviorSubject<string>(null);

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
      valuesObservable$: this._entityEntityService.getEntities().pipe(map(entities => entities.filter(entity => entity.logicalName !== this.selectedNode.getParentEntityName().value))),
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.linkEntity.constructorValue$,
      previousValue$: this.linkEntityPreviousValue$,
      filterFunc: (value: EntityModel, filterValue: string) => {
        return value.logicalName.toLowerCase().includes(filterValue.toLowerCase()) || value.displayName.toLowerCase().includes(filterValue.toLowerCase())
      },
      handlePropertyChangeFunc: this._linkEntityChangeLogic.bind(this)
    };
    this.setControlInitialValues(this.linkEntityForm);
    this.addFilterToInput(this.linkEntityForm);

    this.fromAttributeForm = {
      formControl: new FormControl<string>(null),
      valuesObservable$: combineLatest([this.selectedNode.tagProperties.linkEntity.constructorValue$.pipe(switchMap(entityName => entityName === null ? of([]) : this._attributeService.getAttributes(entityName))),
      this.selectedNode.showOnlyLookups$]).pipe(
        map(([attributes, showOnlyLookups]) => {
          return attributes.filter(attribute => !(showOnlyLookups && attribute.attributeType !== AttributeTypes.LOOKUP));
        })
      ),
      previousValue$: this.fromAttributePreviousValue$,
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.linkFromAttribute.constructorValue$,
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
          this._linkEntityChangeLogic(null);
          this.fromAttributeForm.formControl.disable();
        }
      });
    this.setControlInitialValues(this.fromAttributeForm);
    this.addFilterToInput(this.fromAttributeForm);

    this.toAttributeForm = {
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
      previousValue$: this.toAttributePreviousValue$,
      filteredValues$: null,
      storedInputValue$: this.selectedNode.tagProperties.linkToAttribute.constructorValue$,
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
          this.toAttributeForm.formControl.disable();
        } else {
          this.toAttributeForm.formControl.enable();
        }
      });

    this.setControlInitialValues(this.toAttributeForm);
    this.addFilterToInput(this.toAttributeForm)

    this.linkTypeForm = {
      formControl: new FormControl<string>(null),
      values: LinkTypeOptions,
      storedInputValue$: this.selectedNode.tagProperties.linkType.constructorValue$,
    };
    this.setControlInitialValues(this.linkTypeForm);
    this.subscribeOnInputChanges(this.linkTypeForm);

    this.aliasForm = {
      formControl: new FormControl<string>(null),
      storedInputValue$: this.selectedNode.tagProperties.linkAlias.constructorValue$,
    };
    this.setControlInitialValues(this.aliasForm);
    this.subscribeOnInputChanges(this.aliasForm);

    this.showOnlyLookupsForm = {
      formControl: new FormControl<boolean>(null),
      storedInputValue$: this.selectedNode.showOnlyLookups$
    };
    this.setControlInitialValues(this.showOnlyLookupsForm);
    this.subscribeOnInputChanges(this.showOnlyLookupsForm);
  }

  setControlInitialValues<TProperty, TForm>(linkEntityForm: IFormPropertyModel<TProperty, TForm>) {
    linkEntityForm.storedInputValue$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => linkEntityForm.formControl.setValue(value));
  }

  subscribeOnInputChanges<TProperty, TForm>(linkEntityForm: IFormPropertyModel<TProperty, TForm>) {
    linkEntityForm.formControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => linkEntityForm.storedInputValue$.next(value));
  }

  addFilterToInput<TProperty extends EntityModel | AttributeModel>(propertyForm: IFormPropertyModel<TProperty, string>) {
    propertyForm.filteredValues$ = propertyForm.formControl.valueChanges.pipe(
      startWith(propertyForm.storedInputValue$.value ?? ''),
      switchMap(value => value ? this._filter<TProperty>(value, propertyForm) : propertyForm.valuesObservable$)
    );
  }

  private _filter<TProperty extends EntityModel | AttributeModel>(value: string, propertyForm: IFormPropertyModel<TProperty, string>): Observable<TProperty[]> {
    const filterValue = value.toLowerCase();

    return propertyForm.valuesObservable$.pipe(
      map(
        properties => {
          const property = properties.find(prop => prop.logicalName.toLowerCase() === filterValue);
          if (property) {
            propertyForm.handlePropertyChangeFunc?.(property);
            propertyForm.storedInputValue$.next(filterValue);
            propertyForm.previousValue$?.next(filterValue);

          };
          return properties.filter((property) => propertyForm.filterFunc(property, filterValue))
        }));
  }

  private _linkEntityChangeLogic(entity: EntityModel): void {
    if (!entity) {
      this.selectedNode.tagProperties.linkFromAttribute.constructorValue$.next(null); return;
    }
    if (!this.linkEntityForm.previousValue$.value || entity.logicalName === this.linkEntityForm.previousValue$.value) return;
    this.selectedNode.tagProperties.linkFromAttribute.constructorValue$.next(null);
  }

  onInputChanged<TProperty, TForm>(event: Event, propertyForm: IFormPropertyModel<TProperty, TForm>) {
    if (event.target['value'].trim() === '') {
      propertyForm.storedInputValue$.next(null);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}