import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { RequestService } from 'src/app/services/request/request.service';
import { NodeEntity } from '../../../models/nodes/node-entity';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit, OnDestroy {


  constructor(private requestService: RequestService) { }
  @Input() selectedNode: NodeEntity;
  @Output() onNodeCreate = new EventEmitter<string>()

  entitiesFormControl = new FormControl<string>(null);
  aliasFormControl = new FormControl<string>(null);

  filteredEntities$: Observable<EntityModel[]> = null;
  subscriptions: Subscription[] = [];

  entities: EntityModel[] = [];

  ngOnInit() {
    this.subscriptions.push(this.requestService.getEntities().subscribe((data) => {
      this.entities = data;
      this.addFilterToInput();
    }));    

    this.selectedNode.tagProperties.entityName.value$.subscribe((value) => {
      this.aliasFormControl.setValue(value)
    });
        
    this.aliasFormControl.valueChanges.subscribe((value) => {
      this.selectedNode.tagProperties.entityAlias.value$.next(value);
    });
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
      startWith(''),
      map(value => value ? this._filter(value) : this.entities),
    );
  }

  private _filter(value: string): EntityModel[] {
    const filterValue = value.toLowerCase();

    this.selectedNode.tagProperties.entityName.value$.next(filterValue) 

    return this.entities.filter(entity =>
      entity.logicalName.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}