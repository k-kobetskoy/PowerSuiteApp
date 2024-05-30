import { QueryNodeTree } from 'src/app/components/query-builder/models/query-node-tree';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, combineLatest, distinctUntilChanged, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { UiInputProperty } from 'src/app/components/query-builder/models/abstract/ui-input-property';
import { FilterStaticData } from 'src/app/components/query-builder/models/constants/ui/filter-static-data';
import { NodeCondition } from 'src/app/components/query-builder/models/nodes/node-condition';

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html',
  styleUrls: ['./string-form.component.css']
})
export class StringFormComponent implements OnInit, OnDestroy {


  private _destroy$ = new Subject<void>();

  // @Input() selectedNode: NodeCondition;

  filterOperators: UiInputProperty[] = FilterStaticData.FilterStringOperators;

  filterOperatorFormControl = new FormControl<string>(null);
  filterValueFormControl = new FormControl<string>(null);

  constructor(private _nodeTree: QueryNodeTree) { }

  ngOnInit() {
    this.setControlsInitialValues();
    this.bindDataToControls();
  }

  setControlsInitialValues() {


      // this.filterValueFormControl.valueChanges
      // .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
      // .subscribe(value => { this.selectedNode.tagProperties.conditionValue.value$.next(value); });
      
    this._nodeTree.selectedNode$.pipe(
      switchMap(node =>
        node.tagProperties.conditionOperator.value$.pipe(
          distinctUntilChanged(),          
          tap(value => { this.filterOperatorFormControl.setValue(value) }),
          takeUntil(this._destroy$))
      )).subscribe();

      this._nodeTree.selectedNode$.pipe(
        switchMap(node =>
          node.tagProperties.conditionValue.value$.pipe(
            distinctUntilChanged(),            
            tap(value => { this.filterValueFormControl.setValue(value) }),
            takeUntil(this._destroy$))
        )).subscribe();


    // this.selectedNode.tagProperties.conditionOperator.value$
    //   .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
    //   .subscribe(value => { this.filterOperatorFormControl.setValue(value) });  

    // this.selectedNode.tagProperties.conditionValue.value$
    //   .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
    //   .subscribe(value => { this.filterValueFormControl.setValue(value) });
  }

  bindDataToControls() {

    this._nodeTree.selectedNode$.pipe(
      switchMap(node=>
        this.filterOperatorFormControl.valueChanges.pipe(
          distinctUntilChanged(),
          tap(value => { node.tagProperties.conditionOperator.value$.next(value) }),
          takeUntil(this._destroy$)
        )
      )
    ).subscribe();

    // this.filterOperatorFormControl.valueChanges
    //   .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
    //   .subscribe(value => { this.selectedNode.tagProperties.conditionOperator.value$.next(value); });

    this._nodeTree.selectedNode$.pipe(
      switchMap(node=>
        this.filterValueFormControl.valueChanges.pipe(
          distinctUntilChanged(),
          tap(value => { node.tagProperties.conditionValue.value$.next(value) }),
          takeUntil(this._destroy$)
        )
      )
    ).subscribe();

    // this.filterValueFormControl.valueChanges
    //   .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
    //   .subscribe(value => { this.selectedNode.tagProperties.conditionValue.value$.next(value); });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
