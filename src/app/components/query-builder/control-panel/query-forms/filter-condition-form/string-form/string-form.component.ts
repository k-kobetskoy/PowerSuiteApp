import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs';
import { UiInputProperty } from 'src/app/components/query-builder/models/abstract/ui-input-property';
import { FilterStaticData } from 'src/app/components/query-builder/models/constants/ui/filter-static-data';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html',
  styleUrls: ['./string-form.component.css']
})
export class StringFormComponent implements OnInit, OnDestroy {


  private destroy$ = new Subject<void>();

  @Input() selectedNode: NodeCondition;

  filterOperators: UiInputProperty[] = FilterStaticData.FilterStringOperators;

  filterOperatorFormControl = new FormControl<string>(null);
  filterValueFormControl = new FormControl<string>(null);

  constructor() { }

  ngOnInit() {
    this.setControlsInitialValues();
    this.bindDataToControls();
  }

  setControlsInitialValues() {
    this.selectedNode.tagProperties.conditionOperator.value$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => { this.filterOperatorFormControl.setValue(value) });

    this.selectedNode.tagProperties.conditionValue.value$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => { this.filterValueFormControl.setValue(value) });

    // this.filterOperatorFormControl.setValue(this.selectedNode.tagProperties.conditionOperator.value$.getValue());

    // this.filterValueFormControl.setValue(this.selectedNode.tagProperties.conditionValue.value$.getValue());

  }

  bindDataToControls() {
    this.filterOperatorFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => { this.selectedNode.tagProperties.conditionOperator.value$.next(value); });

    this.filterValueFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => { this.selectedNode.tagProperties.conditionValue.value$.next(value); });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
