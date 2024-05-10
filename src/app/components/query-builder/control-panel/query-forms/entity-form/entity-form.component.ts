import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnvironmentRequestService } from 'src/app/services/request/environment-request.service';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { IQueryFormComponent } from '../../../models/abstract/i-query-form-component';
import { QueryFormTypes } from '../../../models/constants/query-form-types.enum';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit, OnDestroy, IQueryFormComponent {


  constructor(private environmentService: EnvironmentRequestService) { }
  @Input() type = QueryFormTypes.EntityForm;
  @Input() selectedNode: IQueryNode
  @Output() onInputChange = new EventEmitter<IQueryNode>()
  @Output() onNodeCreate = new EventEmitter<string>()

  entitiesFormControl = new FormControl<string>(null);
  filteredEntities$: Observable<EntityModel[]> = null;
  subscriptions: Subscription[] = [];

  entities: EntityModel[] = [];

  ngOnInit() {
    this.subscriptions.push(this.environmentService.getEntities().subscribe((data) => {
      this.entities = data;
      this.addFilterToInput();
    }));
  }

  onKeyPressed($event: KeyboardEvent) {
    if ($event.key === 'Delete' || $event.key === 'Backspace') {
      if (this.entitiesFormControl.value === '') {
        this.selectedNode.name = '(entity)';
        this.onInputChange.emit(this.selectedNode);
      }
    }
  }

  createNode(nodeName: string) {
    this.onNodeCreate.emit(nodeName)
  }

  addFilterToInput() {
    this.filteredEntities$ = this.entitiesFormControl.valueChanges.pipe(
      startWith(''),
      map(value => value ? this._filter(value) : this.entities),
    );
  }

  private _filter(value: string): EntityModel[] {
    const filterValue = value.toLowerCase();

    this.selectedNode.name = value;
    this.onInputChange.emit(this.selectedNode);

    return this.entities.filter(entity =>
      entity.logicalName.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}




