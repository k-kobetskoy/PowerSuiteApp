import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { UiInputProperty } from 'src/app/components/query-builder/models/abstract/ui-input-property';
import { FilterStaticData } from 'src/app/components/query-builder/models/constants/ui/filter-static-data';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';
import { PicklistModel } from 'src/app/models/incoming/picklist/picklist-model';
import { PicklistEntityService } from 'src/app/components/query-builder/services/entity-services/picklist-entity.service';

@Component({
  selector: 'app-picklist-form',
  templateUrl: './picklist-form.component.html',
  styleUrls: ['./picklist-form.component.css']
})
export class PicklistFormComponent implements OnChanges, OnDestroy {

  private _destroy$ = new Subject<void>();

  @Input() selectedNode: NodeCondition;
  @Input() attribute: AttributeModel;

  filterOperators: UiInputProperty[] = FilterStaticData.FilterPickListOperators;
  picklistValues$: Observable<PicklistModel[]>;

  filterOperatorFormControl = new FormControl<string>(null);
  filterValueFormControl = new FormControl<string>(null);

  constructor(private _picklistEntityService: PicklistEntityService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNode || changes.attribute) {
      this._destroy$.next();

      this.initializePicklistValues();
      this.setControlsInitialValues();
      this.bindDataToControls();
    }
  }

  initializePicklistValues() {
    const entityLogicalName = this.selectedNode.getParentEntity()?.tagProperties.entityName.value$.value;
    const conditionAttribute = this.selectedNode.tagProperties.conditionAttribute.value$.value;
    this.picklistValues$ = this._picklistEntityService.getOptions(entityLogicalName, conditionAttribute, this.attribute.attributeType);
  }

  setControlsInitialValues() {
    this.selectedNode.tagProperties.conditionOperator.value$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.filterOperatorFormControl.setValue(value));

    this.selectedNode.tagProperties.conditionValue.value$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.filterValueFormControl.setValue(value));
  }

  bindDataToControls() {
    this.filterOperatorFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.selectedNode.tagProperties.conditionOperator.value$.next(value));

    this.filterValueFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.selectedNode.tagProperties.conditionValue.value$.next(value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
