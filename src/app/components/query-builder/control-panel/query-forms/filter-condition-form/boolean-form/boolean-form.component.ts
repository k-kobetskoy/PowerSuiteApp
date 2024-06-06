import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { UiInputProperty } from 'src/app/components/query-builder/models/abstract/ui-input-property';
import { FilterStaticData } from 'src/app/components/query-builder/models/constants/ui/filter-static-data';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';
import { BooleanModel } from 'src/app/models/incoming/boolean/boolean-model';
import { BooleanEntityService } from 'src/app/components/query-builder/services/entity-services/boolean-entity.service';

@Component({
  selector: 'app-boolean-form',
  templateUrl: './boolean-form.component.html',
  styleUrls: ['./boolean-form.component.css']
})
export class BooleanFormComponent implements OnChanges, OnDestroy {

  private _destroy$ = new Subject<void>();

  @Input() selectedNode: NodeCondition;
  @Input() attributeValue: string;

  filterOperators: UiInputProperty[] = FilterStaticData.FilterBooleanOperators;
  booleanOptions$: Observable<BooleanModel>

  filterOperatorFormControl = new FormControl<string>(null);
  filterValueFormControl = new FormControl<string>(null);

  constructor(private _booleanService: BooleanEntityService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.selectedNode && !changes.attributeValue) return;
    
    this._destroy$.next();

    this.initializeBooleanValues();
  
    this.setControlsInitialValues();
    this.bindDataToControls();
  }
  
  initializeBooleanValues() {
    const entityLogicalName = this.selectedNode.getParentEntity()?.tagProperties.entityName.value$.value;
    const conditionAttribute = this.selectedNode.tagProperties.conditionAttribute.value$.value;
    this.booleanOptions$ = this._booleanService.getBooleanValues(entityLogicalName, conditionAttribute);
  }

  setControlsInitialValues() {
    this.selectedNode.tagProperties.conditionOperator.value$
      .pipe(takeUntil(this._destroy$))
      .subscribe(value => this.filterOperatorFormControl.setValue(value));

    this.selectedNode.tagProperties.conditionValue.value$
      .pipe(takeUntil(this._destroy$))
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
