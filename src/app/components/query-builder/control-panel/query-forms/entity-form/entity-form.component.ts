import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { Observable, Subject, distinctUntilChanged, iif, map, startWith, switchMap, takeUntil } from 'rxjs';
import { NodeEntity } from '../../../models/nodes/node-entity';
import { EntityEntityService } from 'src/app/services/entity-service/entity-entity.service';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit, OnDestroy {

  @Input() selectedNode: NodeEntity;
  @Output() onNodeCreate = new EventEmitter<string>()

  private destroy$ = new Subject<void>();

  entitiesFormControl = new FormControl<string>(null);
  aliasFormControl = new FormControl<string>(null);

  filteredEntities$: Observable<EntityModel[]> = null;

  entities$: Observable<EntityModel[]>;

  constructor(private _entityEntityService: EntityEntityService) { }

  ngOnInit() {

    this.entities$ = this._entityEntityService.getEntities();

    this.addFilterToInput();

    this.bindDataToControls();

    this.setControlsInitialValues();
  }

  bindDataToControls() {
    this.aliasFormControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => { this.selectedNode.tagProperties.entityAlias.value$.next(value); });
  }

  setControlsInitialValues() {
    const entityInitialValue = this.selectedNode.tagProperties.entityName.value$.getValue();
    const entityAliasInitialValue = this.selectedNode.tagProperties.entityAlias.value$.getValue();

    this.entitiesFormControl.setValue(entityInitialValue);
    this.aliasFormControl.setValue(entityAliasInitialValue);
  }

  onKeyPressed($event: KeyboardEvent) {
    if ($event.key === 'Delete' || $event.key === 'Backspace') {
      if (this.entitiesFormControl.value === '') {
        this.selectedNode.tagProperties.entityName.value$.next(null);
      }
    }
  }

  addFilterToInput() {
    this.filteredEntities$ = this.entitiesFormControl.valueChanges.pipe(
      startWith(this.selectedNode.tagProperties.entityName.value$.value ?? ''),
      switchMap(value => value ? this._filter(value) : this.entities$),
    );
  }

  private _filter(value: string): Observable<EntityModel[]> {
    const filterValue = value.toLowerCase();

    this.selectedNode.tagProperties.entityName.value$.next(filterValue)

    return this.entities$.pipe(
      map(entities => {
        if (!entities) return [];
        return entities.filter(entity =>
          entity.logicalName.toLowerCase().includes(filterValue) ||
          entity.displayName.toLowerCase().includes(filterValue))
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}