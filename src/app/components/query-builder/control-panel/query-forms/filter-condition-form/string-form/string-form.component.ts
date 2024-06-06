import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { UiInputProperty } from 'src/app/components/query-builder/models/abstract/ui-input-property';
import { FilterStaticData } from 'src/app/components/query-builder/models/constants/ui/filter-static-data';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html',
  styleUrls: ['./string-form.component.css']
})
export class StringFormComponent implements OnDestroy, OnChanges {

  private _destroy$ = new Subject<void>();

  @Input() selectedNode: NodeCondition;

  filterOperators: UiInputProperty[] = FilterStaticData.FilterStringOperators;

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
    this.selectedNode.tagProperties.conditionOperator.value$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value =>  this.filterOperatorFormControl.setValue(value));  

    this.selectedNode.tagProperties.conditionValue.value$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.filterValueFormControl.setValue(value));
  }

  bindDataToControls() {
    this.filterOperatorFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value =>  this.selectedNode.tagProperties.conditionOperator.value$.next(value));
    
    this.filterValueFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value =>  this.selectedNode.tagProperties.conditionValue.value$.next(value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
