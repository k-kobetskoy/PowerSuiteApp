import { Component, OnInit } from '@angular/core';
import { EnvironmentModel } from 'src/app/models/environment-model';
import { FormControl } from '@angular/forms';
import { EnvironmentRequestService } from 'src/app/services/request/environment-request.service';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { Observable, Subject, firstValueFrom, lastValueFrom, map, mergeAll, startWith } from 'rxjs';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {

  constructor(private environmentService: EnvironmentRequestService) { }
  // activeEnvironment: EnvironmentModel = null;
  entitiesInput = new FormControl<string>(null);
  // entities$: Observable<EntityModel[]> = null;
  filteredEntities$: Observable<EntityModel[]> = null;

  entities: EntityModel[] = [];

  ngOnInit() {
    this.environmentService.getEntities().subscribe((data) => {
      this.entities = data;
      this.addFilterToInput();
    });    
  }


  addFilterToInput() {
    this.filteredEntities$ = this.entitiesInput.valueChanges.pipe(
      startWith(''),
      map(value => 
       
         value ? this._filter(value) : this.entities
      )
    );
  }


  private _filter(value: string): EntityModel[] {
    const filterValue = value.toLowerCase();

    // let entities$ = new Subject<EntityModel[]>();

    // this.entities$.subscribe((data) => {
    //   entities$.next(data.filter( entity=>
        
    //     entity.logicalName.toLowerCase().includes(filterValue) 
    //     //|| entity.displayName.toLowerCase().includes(filterValue) 
          
    //   ));
    // });
    // return entities$.asObservable();


    return this.entities.filter(entity =>
      entity.logicalName.toLowerCase().includes(filterValue) 
   
    );
  }

}




