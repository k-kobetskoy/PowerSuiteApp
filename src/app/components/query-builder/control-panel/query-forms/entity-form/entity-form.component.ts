import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { IQueryNode } from '../../../models/abstract/i-query-node';
import { INodeProperty } from '../../../models/abstract/i-node-property';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit, OnDestroy {


  constructor(private requestService: RequestService) { }
  @Input() selectedNode: IQueryNode
  @Output() onInputChange = new EventEmitter<IQueryNode>()
  @Output() onNodeCreate = new EventEmitter<string>()

  entitiesFormControl = new FormControl<string>(null);
  filteredEntities$: Observable<EntityModel[]> = null;
  subscriptions: Subscription[] = [];

  entities: EntityModel[] = [];

  entityNodeProperty: INodeProperty

  ngOnInit() {
    this.initNodeProperties();

    this.subscriptions.push(this.requestService.getEntities().subscribe((data) => {
      this.entities = data;
      this.addFilterToInput();
    }));
  }

  initNodeProperties() {
    this.entityNodeProperty = { name: 'name' };
    this.selectedNode.nodeProperties = [this.entityNodeProperty];
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
      this.entityNodeProperty.value = null;
    } else {
      this.selectedNode.displayValue = entityName;
      this.entityNodeProperty.value = entityName;
    }

    this.onInputChange.emit(this.selectedNode);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}