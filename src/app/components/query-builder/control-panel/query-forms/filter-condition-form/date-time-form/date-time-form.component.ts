import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { UiInputProperty } from 'src/app/components/query-builder/models/abstract/ui-input-property';
import { FilterStaticData } from 'src/app/components/query-builder/models/constants/ui/filter-static-data';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';

@Component({
  selector: 'app-date-time-form',
  templateUrl: './date-time-form.component.html',
  styleUrls: ['./date-time-form.component.css']
})
export class DateTimeFormComponent implements OnDestroy, OnChanges {

  private _destroy$ = new Subject<void>();

  @Input() selectedNode: NodeCondition;

  filterOperators: UiInputProperty[] = FilterStaticData.FilterDateTimeOperators;

  filterOperatorFormControl = new FormControl<string>(null);
  filterValueFormControl = new FormControl<string>(null);

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.selectedNode) return;

    this._destroy$.next();

    this.setControlsInitialValues();
    this.bindDataToControls();
  }

  setControlsInitialValues() {          
    this.selectedNode.tagProperties.conditionOperator.constructorValue$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value =>  this.filterOperatorFormControl.setValue(value));

    this.selectedNode.tagProperties.conditionValue.constructorValue$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.filterValueFormControl.setValue(value));
  }

  bindDataToControls() {
    this.filterOperatorFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value =>  this.selectedNode.tagProperties.conditionOperator.constructorValue$.next(value));
    
    this.filterValueFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value =>  this.selectedNode.tagProperties.conditionValue.constructorValue$.next(value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
