import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnvironmentRequestService } from 'src/app/services/request/environment-request.service';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { IQueryNode } from '../../../models/abstract/i-query-node';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit, OnDestroy {


  constructor(private environmentService: EnvironmentRequestService) { }
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
        this.updateEntityName('');
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

    this.updateEntityName(value);

    return this.entities.filter(entity =>
      entity.logicalName.toLowerCase().includes(filterValue)
    );
  }

  updateEntityName(entityName: string) {
    if (!entityName) {
      this.selectedNode.displayValue = this.selectedNode.defaultDisplayValue;
      this.selectedNode.nodeProperty.entityName = null;
    } else {
      this.selectedNode.displayValue = entityName;
      this.selectedNode.nodeProperty.entityName = entityName;
    }

    this.onInputChange.emit(this.selectedNode);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}




