import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { Observable, Subscription, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { RequestService } from 'src/app/services/request/request.service';
import { NodeEntity } from '../../../models/nodes/node-entity';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit, OnDestroy {

  @Input() selectedNode: NodeEntity;
  @Output() onNodeCreate = new EventEmitter<string>()

  entitiesFormControl = new FormControl<string>(null);
  aliasFormControl = new FormControl<string>(null);

  filteredEntities$: Observable<EntityModel[]> = null;
  subscriptions: Subscription[] = [];

  entities$: Observable<EntityModel[]>;

  constructor(private requestService: RequestService) { }

  ngOnInit() {

    this.entities$ = this.requestService.getEntities();

    this.addFilterToInput();

    this.bindDataToControls();
  }

  bindDataToControls() {
    this.subscriptions.push(
      this.selectedNode.tagProperties.entityName.value$
        .pipe(distinctUntilChanged())
        .subscribe((value) => { this.entitiesFormControl.setValue(value); })
    );

    this.subscriptions.push(
      this.selectedNode.tagProperties.entityAlias.value$
        .pipe(distinctUntilChanged())
        .subscribe((value) => { this.aliasFormControl.setValue(value); })
    );

    this.subscriptions.push(
      this.aliasFormControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((value) => { this.selectedNode.tagProperties.entityAlias.value$.next(value); })
    );
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
      map(entities => entities.filter(entity =>
        entity.logicalName.toLowerCase().includes(filterValue) ||
        entity.displayName.toLowerCase().includes(filterValue)
      ))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}