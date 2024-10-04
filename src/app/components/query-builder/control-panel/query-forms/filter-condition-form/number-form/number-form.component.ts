import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { UiInputProperty } from 'src/app/components/query-builder/models/abstract/ui-input-property';
import { FilterStaticData } from 'src/app/components/query-builder/models/constants/ui/filter-static-data';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';

@Component({
  selector: 'app-number-form',
  templateUrl: './number-form.component.html',
  styleUrls: ['./number-form.component.css']
})
export class NumberFormComponent implements OnChanges, OnDestroy{

  private _destroy$ = new Subject<void>();

  @Input() selectedNode: NodeCondition;

  filterOperators: UiInputProperty[] = FilterStaticData.FilterNumberOperators;

  filterOperatorFormControl = new FormControl<string>(null);
  filterValueFormControl = new FormControl<number>(null);

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.selectedNode) return;

    this._destroy$.next();

    this.setControlsInitialValues();
    this.bindDataToControls();
  }


  setControlsInitialValues() {
    this.selectedNode.tagProperties.conditionOperator.constructorValue$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.filterOperatorFormControl.setValue(value));

    this.selectedNode.tagProperties.conditionValue.constructorValue$
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.filterValueFormControl.setValue(+value));
  }

  bindDataToControls() {
    this.filterOperatorFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.selectedNode.tagProperties.conditionOperator.constructorValue$.next(value));

    this.filterValueFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe(value => this.selectedNode.tagProperties.conditionValue.constructorValue$.next(value.toString()));
  }

  onKeyPressed() {
    if (this.filterValueFormControl.value === null || this.filterValueFormControl.value === undefined) {
      this.selectedNode.tagProperties.conditionValue.constructorValue$.next(null);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
